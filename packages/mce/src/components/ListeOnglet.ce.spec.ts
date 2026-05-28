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

import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createI18n, I18nInjectionKey } from 'vue-i18n'
import ListeOnglet from './ListOnglet.ce.vue'

const messages = {
  fr: {
    'list-onglet': {
      GENERALE: 'Mes informations générales',
      SERVICE: 'Mes services ENT',
    },
  },
}

describe('listeOnglet', () => {
  const defaultProps = {
    list: ['GENERALE', 'SERVICE'],
    ongletCurrent: 'GENERALE',
    classBtn: 'btn-secondary-toggle',
    userInfoApiUrl: 'https://api.test.fr',
  }

  let wrapper: VueWrapper

  beforeEach(() => {
    const i18n = createI18n({ legacy: false, locale: 'fr', messages })
    wrapper = mount(ListeOnglet, {
      props: defaultProps,
      global: {
        plugins: [i18n],
        provide: { [I18nInjectionKey as symbol]: i18n },
      },
    })
  })

  // --------------------------------------------------
  // RENDU ET TRADUCTIONS
  // --------------------------------------------------
  describe('rendu des onglets', () => {
    it('affiche la liste des onglets avec les textes traduits', () => {
      const buttons = wrapper.findAll('button')
      expect(buttons).toHaveLength(2)
      expect(buttons[0].text()).toBe('Mes informations générales')
      expect(buttons[1].text()).toBe('Mes services ENT')
    })

    it('applique la classe active à l\'onglet courant', () => {
      const activeBtn = wrapper.find('button.active')
      expect(activeBtn.exists()).toBe(true)
      expect(activeBtn.text()).toBe('Mes informations générales')
      expect(activeBtn.attributes('aria-current')).toBe('page')
    })
  })

  // --------------------------------------------------
  // INTERACTIONS ET ÉVÉNEMENTS
  // --------------------------------------------------
  describe('interactions', () => {
    it('émet l\'événement "selectOnglet" lors d\'un clic', async () => {
      await wrapper.findAll('button')[1].trigger('click')

      expect(wrapper.emitted('selectOnglet')).toBeTruthy()
      expect(wrapper.emitted('selectOnglet')?.[0]).toEqual(['SERVICE'])
    })
  })

  // --------------------------------------------------
  // BRANCHES ALTERNATIVES
  // --------------------------------------------------
  describe('branche alternative sans i18n', () => {
    it('renvoie la clé brute si le plugin i18n est absent', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const wrapperNoI18n = mount(ListeOnglet, {
        props: defaultProps,
        global: { provide: {} },
      })

      expect(wrapperNoI18n.find('button').text()).toBe('GENERALE')
      warnSpy.mockRestore()
    })
  })
})
