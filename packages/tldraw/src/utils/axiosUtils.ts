/**
 * Copyright (C) 2023 GIP-RECIA, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import axios from 'axios'
import throttle from 'lodash.throttle'
import { getJwt } from './soffitUtils.ts'

const instance = axios.create({
  timeout: import.meta.env.VITE_AXIOS_TIMEOUT,
})

let token: string | undefined
let timeout: number | undefined
let renewToken: any

function setToken(newToken: string): void {
  token = newToken
}

async function init() {
  try {
    const {
      encoded,
      decoded: { exp, iat },
    } = await getJwt()
    token = `Bearer ${encoded}`
    timeout = (exp - iat) * 1000 * 0.75
    renewToken = throttle(async () => {
      try {
        const { encoded } = await getJwt()
        token = `Bearer ${encoded}`
      }
      catch (e) {
        console.error(e)
      }
    }, timeout)
  }
  catch (e) {
    console.error(e)
  }
}

instance.interceptors.request.use(async (config) => {
  if (!timeout && !token)
    await init()
  else if (timeout)
    await renewToken()
  config.headers.Authorization = token

  return config
})

function errorHandler(e: any): void {
  if (axios.isAxiosError(e)) {
    console.error(e.message)
  }
  else if (e instanceof Error) {
    console.error(e.message)
  }
  else {
    console.error(e)
  }
}

export { errorHandler, instance, setToken }
