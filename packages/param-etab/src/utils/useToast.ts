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

import i18n from '@/plugins/i18n'
import { toast } from 'vue3-toastify'

const { t } = i18n.global

function showError(errorMsgKey: string) {
  let errorMessage: string
  if (['perte-connexion', 'permission-refusee'].includes(errorMsgKey)) {
    errorMessage = t(`error.${errorMsgKey}`)
  }
  else {
    errorMessage = t(`error.aucun-connexion-api`)
  }

  toast.error(errorMessage, {
    autoClose: false,
  })
}

function showSuccess() {
  toast.success(t(`success.update-success`))
}

export { showError, showSuccess }
