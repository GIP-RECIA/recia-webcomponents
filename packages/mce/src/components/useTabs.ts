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
import type { Ref, ShallowRef } from 'vue'
import { ref } from 'vue'

export function useTabs({
  tabs,
  tabsRefs,
  onTabChange,
}: {
  tabs: Ref<string[]>
  tabsRefs: Readonly<ShallowRef<HTMLButtonElement[] | null>>
  // Callback optionnel appelé à chaque changement d'onglet (clic ou clavier)
  onTabChange?: (index: number) => void
}) {
  const activeTab = ref<number>(0)

  function setActiveTab(tab: number, focus: boolean = false): void {
    activeTab.value = tab
    if (focus && tabsRefs.value)
      tabsRefs.value[tab]?.focus()
    onTabChange?.(tab)
  }

  function changeActiveTab(e: KeyboardEvent): void {
    let index: number | undefined
    const active = activeTab.value

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        index = active - 1 > -1
          ? active - 1
          : tabs.value.length - 1
        break
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        index = active + 1 < tabs.value.length
          ? active + 1
          : 0
        break
      case 'Home':
        e.preventDefault()
        index = 0
        break
      case 'End':
        e.preventDefault()
        index = tabs.value.length - 1
        break
      default:
        index = undefined
        break
    }

    if (index === undefined || active === index)
      return

    setActiveTab(index, true)
  }

  return {
    activeTab,
    setActiveTab,
    changeActiveTab,
  }
}
