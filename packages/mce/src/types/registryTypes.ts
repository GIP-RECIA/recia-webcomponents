/**
 * Copyright (C) 2025 GIP-RECIA, Inc.
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

export interface PortletRegistryApiResponse {
  registry: Registry
}

export interface Registry {
  categories: PortletCategory[]
}

export interface PortletCategory {
  id: string
  name: string
  description: string
  portlets: PortletFromRegistry[]
  subcategories: PortletCategory[]
}

export interface PortletFromRegistry {
  id: number
  typeId: number
  fname: string
  name: string
  title: string
  description: string
  keywords: string[]
  averageRating: number
  ratingsCount: number
  favorite: boolean
  state: PortletState
  parameters: { [key: string]: PortletFromRegistryParameter }
  categories: number[]
}

export interface PortletFromRegistryParameter {
  name: PortletParameterName
  description: string
  value: string
}

export enum PortletParameterName {
  Alternate = 'alternate',
  AlternativeMaximizedLink = 'alternativeMaximizedLink',
  AlternativeMaximizedLinkTarget = 'alternativeMaximizedLinkTarget',
  BlockImpersonation = 'blockImpersonation',
  ChromeStyle = 'chromeStyle',
  Configurable = 'configurable',
  DisableDynamicTitle = 'disableDynamicTitle',
  DisablePortletEvents = 'disablePortletEvents',
  Editable = 'editable',
  HasAbout = 'hasAbout',
  HasHelp = 'hasHelp',
  HideFromDesktop = 'hideFromDesktop',
  HideFromMobile = 'hideFromMobile',
  Highlight = 'highlight',
  IconURL = 'iconUrl',
  Locale = 'locale',
  MobileIconURL = 'mobileIconUrl',
  Printable = 'printable',
  Secure = 'secure',
  ShowChrome = 'showChrome',
}

export enum PortletState {
  Published = 'PUBLISHED',
}
