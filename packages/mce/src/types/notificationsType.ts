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

export type Channel = 'ws' | 'mail' | 'push'

export interface Priorities {
  HIGH: Record<Channel, boolean>
  NORMAL: Record<Channel, boolean>
  LOW: Record<Channel, boolean>
}

export interface ServicePref {
  enabled: boolean
  override: boolean
  priorities: Priorities
  _displayName?: string
  _isAuthorized?: boolean
}

export interface UserPreferencesData {
  userId?: string
  services: Record<string, ServicePref>
}

export interface NotificationCatalogItem {
  service: string
  priority: 'HIGH' | 'NORMAL' | 'LOW'
  description: string
}
