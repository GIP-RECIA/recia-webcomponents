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
import { nextTick } from 'vue'
import { createI18n, I18nInjectionKey } from 'vue-i18n'
import InformationPersonnelle from '../components/InformationPersonnelle.ce.vue'

const messages = {
  fr: {
    'user-info': {
      'informations-personnelles': 'Informations personnelles',
      'uid': 'UID',
      'civilite': 'Civilité',
      'nom': 'Nom',
      'prenom': 'Prénom',
      'bod': 'Date de naissance',
      'categorie': 'Catégorie',
      'email': 'Mail',
      'modifier': 'Modifier',
    },
  },
}

describe('informationPersonnelle', () => {
  const defaultProps = {
    uid: 'recia-999',
    civilite: 'M.',
    nom: 'Dupont',
    prenom: 'Jean',
    categorie: 'Personnel',
    dateNaissance: '1980-01-01',
    userMail: 'jean.dupont@recia.fr',
    userId: '123',
    userInfoApiUrl: 'https://api.test.fr/userinfo',
    mceApi: 'https://api.test.fr',
    canModifyEmail: false,
  }

  let wrapper: VueWrapper

  beforeEach(() => {
    vi.clearAllMocks()

    const i18n = createI18n({
      legacy: false,
      locale: 'fr',
      fallbackLocale: 'fr',
      messages,
    })

    wrapper = mount(InformationPersonnelle, {
      props: defaultProps,
      global: {
        plugins: [i18n],
        provide: {
          [I18nInjectionKey as symbol]: {
            global: i18n.global,
          },
        },
      },
    })
  })

  describe('rendu des données et labels', () => {
    it('affiche le titre dans un h3', () => {
      expect(wrapper.find('h3').text())
        .toBe('Informations personnelles')
    })

    it('affiche tous les labels', () => {
      const labels = wrapper.findAll('.info-label').map(el => el.text())

      expect(labels).toContain('UID')
      expect(labels).toContain('Civilité')
      expect(labels).toContain('Nom')
      expect(labels).toContain('Prénom')
      expect(labels).toContain('Date de naissance')
      expect(labels).toContain('Catégorie')
      expect(labels).toContain('Mail')
    })

    it('affiche les informations utilisateur', () => {
      const text = wrapper.text()

      expect(text).toContain('recia-999')
      expect(text).toContain('M.')
      expect(text).toContain('Dupont')
      expect(text).toContain('Jean')
      expect(text).toContain('Personnel')
      expect(text).toContain('jean.dupont@recia.fr')
    })

    it('affiche des tirets lorsque les données sont absentes', () => {
      const i18n = createI18n({
        legacy: false,
        locale: 'fr',
        messages,
      })

      const wrapperEmpty = mount(InformationPersonnelle, {
        props: {
          userId: '123',
          userInfoApiUrl: '',
          mceApi: '',
        },
        global: {
          plugins: [i18n],
          provide: {
            [I18nInjectionKey as symbol]: {
              global: i18n.global,
            },
          },
        },
      })

      const values = wrapperEmpty
        .findAll('.info-value')
        .map(el => el.text())

      expect(values).toContain('—')
    })

    it('renvoie les clés brutes si i18n est absent', () => {
      const warnSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {})

      const wrapperNoI18n = mount(InformationPersonnelle, {
        props: defaultProps,
      })

      expect(wrapperNoI18n.find('h3').text())
        .toBe('informations-personnelles')

      warnSpy.mockRestore()
    })
  })

  describe('gestion du bouton Modifier', () => {
    it('affiche le bouton Modifier lorsque canModifyEmail vaut false', () => {
      const btn = wrapper.find('.btn-primary')

      expect(btn.exists()).toBe(true)
      expect(btn.text()).toBe('Modifier')
    })

    it('masque le bouton lorsque canModifyEmail vaut true', () => {
      const i18n = createI18n({
        legacy: false,
        locale: 'fr',
        messages,
      })

      const wrapperReadOnly = mount(InformationPersonnelle, {
        props: {
          ...defaultProps,
          canModifyEmail: true,
        },
        global: {
          plugins: [i18n],
          provide: {
            [I18nInjectionKey as symbol]: {
              global: i18n.global,
            },
          },
        },
      })

      expect(wrapperReadOnly.find('.btn-primary').exists())
        .toBe(false)
    })
  })

  describe('événements', () => {
    it('émet openChangeEmail lors du clic sur Modifier', async () => {
      await wrapper.find('.btn-primary').trigger('click')

      expect(wrapper.emitted('openChangeEmail')).toBeTruthy()
      expect(wrapper.emitted('openChangeEmail')).toHaveLength(1)
    })
  })

  describe('watchers et réactivité', () => {
    it('actualise l’email affiché lorsque userMail change', async () => {
      await wrapper.setProps({
        userMail: 'mutation@recia.fr',
      })

      await nextTick()

      expect(wrapper.find('.info-value--bold').text())
        .toBe('mutation@recia.fr')
    })

    it('ignore une valeur vide dans le watcher', async () => {
      await wrapper.setProps({
        userMail: '',
      })

      await nextTick()

      expect(wrapper.find('.info-value--bold').text())
        .toBe('jean.dupont@recia.fr')
    })
  })

  describe('formatage de la date', () => {
    it('affiche la date formatée', () => {
      const date = wrapper.find('time')

      expect(date.exists()).toBe(true)
      expect(date.text()).toBe('01/01/1980')
      expect(date.attributes('datetime')).toBe('1980-01-01')
    })

    it('n’affiche pas de balise time lorsque la date est absente', () => {
      const i18n = createI18n({
        legacy: false,
        locale: 'fr',
        messages,
      })

      const wrapperWithoutDate = mount(InformationPersonnelle, {
        props: {
          ...defaultProps,
          dateNaissance: undefined,
        },
        global: {
          plugins: [i18n],
          provide: {
            [I18nInjectionKey as symbol]: {
              global: i18n.global,
            },
          },
        },
      })

      expect(wrapperWithoutDate.find('time').exists())
        .toBe(false)

      expect(wrapperWithoutDate.text())
        .toContain('—')
    })

    it('retourne la valeur brute si la date est invalide', () => {
      const i18n = createI18n({
        legacy: false,
        locale: 'fr',
        messages,
      })

      const wrapperInvalidDate = mount(InformationPersonnelle, {
        props: {
          ...defaultProps,
          dateNaissance: 'date-invalide',
        },
        global: {
          plugins: [i18n],
          provide: {
            [I18nInjectionKey as symbol]: {
              global: i18n.global,
            },
          },
        },
      })

      expect(wrapperInvalidDate.find('time').text())
        .toBe('date-invalide')
    })
  })
})
