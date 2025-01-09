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

import type { Organization } from '@/types/Organization.ts'
import type { Redactor } from '@/types/Redactor.ts'
import type { User } from '@/types/User.ts'

export interface AbstractItem {
  type: string
  id: number
  createdBy: User
  createdDate: Date
  lastModifiedBy: User
  lastModifiedDate: Date
  title: string
  enclosure: string
  endDate: Date
  startDate: Date
  validatedBy: User
  validatedDate: Date
  status: string
  summary: string
  rssAllowed: boolean
  organization: Organization
  redactor: Redactor
  displayName: string
  contextKey: Set<object>
}
