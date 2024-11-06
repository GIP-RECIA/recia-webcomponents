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

export interface CommonProps {
  debug: boolean

  // Tldraw props
  darkMode: boolean
  readOnly: boolean

  // Custom props
  autoSave: boolean
  autoSaveDelay: number
  open: boolean

  // State props
  isReady: boolean

  // Setters for common state
  setIsSaving: (value: boolean) => void
  setIsLoading: (value: boolean) => void
  setIsError: (value: boolean) => void
  setIsReady: (value: boolean) => void
}
