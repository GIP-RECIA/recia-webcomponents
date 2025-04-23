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
import { CustomError } from './CustomError'
import { getToken } from './soffitUtils'

const instance = axios.create({
  timeout: import.meta.env.VITE_AXIOS_TIMEOUT,
})

let token: string | undefined

async function initToken(apiUrl: string): Promise<void> {
  try {
    const {
      encoded,
      decoded: { exp, iat },
    } = await getToken(apiUrl)
    token = `Bearer ${encoded}`
    const timeout = (exp - iat) * 1000 * 0.75

    // relance la methode a interval regulier
    setInterval(async () => {
      try {
        const { encoded } = await getToken(apiUrl)
        token = `Bearer ${encoded}`
      }
      catch (es: any) {
        console.error('Unable to renew token', es)
        throw new CustomError(es.message, es.statusCode)
      }
    }, timeout)
  }
  catch (e: any) {
    throw new CustomError(e.message, e.statusCode)
  }
}

instance.interceptors.request.use(async (config) => {
  config.headers.Authorization = token
  return config
})

export { initToken, instance }
