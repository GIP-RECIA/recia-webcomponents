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

import type {
  PortletCategory,
  PortletFromRegistry,
  PortletRegistryApiResponse,
} from '../types/registryTypes.ts'

async function getAll(
    portletApiUrl: string,
  ): Promise<
    {
      portlets: PortletFromRegistry[]
    }
    | undefined
  > {
    try {
      const response = await fetch(portletApiUrl, {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok)
        throw new Error(response.statusText)

      const data: PortletRegistryApiResponse = await response.json()

      if (!data.registry.categories) {
        console.error(`No data for ${portletApiUrl}`)
        return undefined
      }

      return extractPortletsAndCategories(data)
    }
    catch (err) {
      console.error(err, portletApiUrl)
      return undefined
    }
  }

    function extractPortletsAndCategories(
    data: PortletRegistryApiResponse,
  ): {
    portlets: PortletFromRegistry[]
  } {
    const portletMap = new Map<string, PortletFromRegistry>()

    const walk = (category: PortletCategory) => {
      const id = Number(category.id.split('.')[1])


      for (const portlet of category.portlets ?? []) {
        const existing = portletMap.get(portlet.fname)

        if (!existing) {
          portletMap.set(
            portlet.fname,
            {
              ...portlet,
              categories: [id],
            },
          )
        }
        else {
          existing.categories = Array.from(
            new Set([...existing.categories, id]),
          )
        }
      }

      for (const sub of category.subcategories ?? []) {
        walk(sub)
      }
    }

    for (const category of data.registry.categories) {
      walk(category)
    }

    return {
      portlets: Array.from(portletMap.values()),
    }
  }

  export { getAll, extractPortletsAndCategories }