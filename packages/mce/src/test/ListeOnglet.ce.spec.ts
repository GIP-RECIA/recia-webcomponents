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
import ListeOnglet from '../components/ListOnglet.ce.vue'

const messages = {
  fr: {
    'list-onglet': {
      'GENERALE': 'Mes informations générales',
      'SERVICE': 'Mes services ENT',
      'nav-label': 'Menu de navigation',
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
    const i18n = createI18n({ locale: 'fr', messages })
    wrapper = mount(ListeOnglet, {
      props: defaultProps,
      global: {
        plugins: [i18n],
        // Le composant injecte I18nInjectionKey et appelle i18n.global.t
        provide: {
          [I18nInjectionKey as symbol]: { global: i18n.global },
        },
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

    it('applique la classe "active" à l\'onglet courant', () => {
      const activeBtn = wrapper.find('button.active')
      expect(activeBtn.exists()).toBe(true)
      expect(activeBtn.text()).toBe('Mes informations générales')
    })

    it('applique aria-selected="true" à l\'onglet actif', () => {
      const activeBtn = wrapper.find('button.active')
      expect(activeBtn.attributes('aria-selected')).toBe('true')
    })

    it('n\'applique pas aria-selected="true" aux onglets inactifs', () => {
      const buttons = wrapper.findAll('button')
      const inactiveBtn = buttons[1]
      expect(inactiveBtn.attributes('aria-selected')).toBe('false')
    })

    it('applique la classBtn fournie en prop à chaque bouton', () => {
      wrapper.findAll('button').forEach((btn) => {
        expect(btn.classes()).toContain('btn-secondary-toggle')
      })
    })

    it('affiche les onglets dans une liste sémantique', () => {
      expect(wrapper.find('ul').exists()).toBe(true)
      expect(wrapper.findAll('li')).toHaveLength(2)
    })

    it('définit explicitement type="button" sur chaque bouton', () => {
      wrapper.findAll('button').forEach((btn) => {
        expect(btn.attributes('type')).toBe('button')
      })
    })
  })

  // --------------------------------------------------
  // INTERACTIONS ET ÉVÉNEMENTS
  // --------------------------------------------------
  describe('interactions', () => {
    it('émet l\'événement "selectOnglet" avec la valeur correcte lors d\'un clic', async () => {
      await wrapper.findAll('button')[1].trigger('click')
      expect(wrapper.emitted('selectOnglet')).toBeTruthy()
      expect(wrapper.emitted('selectOnglet')?.[0]).toEqual(['SERVICE'])
    })

    it('émet "selectOnglet" aussi pour l\'onglet déjà actif', async () => {
      await wrapper.findAll('button')[0].trigger('click')
      expect(wrapper.emitted('selectOnglet')?.[0]).toEqual(['GENERALE'])
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
      // m(item) sans i18n → retourne la clé brute 'GENERALE'
      expect(wrapperNoI18n.find('button').text()).toBe('GENERALE')
      warnSpy.mockRestore()
    })
  })
})
