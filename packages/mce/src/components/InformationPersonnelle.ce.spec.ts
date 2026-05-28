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
import ChangeEmail from '@/components/ChangeEmail.ce.vue'
import InformationPersonnelle from './InformationPersonnelle.ce.vue'

// 1. Mocks
vi.mock('@/components/ChangeEmail.ce.vue', () => ({
  default: {
    name: 'ChangeEmail',
    template: '<div class="mock-change-email">Mock Enfant</div>',
  },
}))

const messages = {
  fr: {
    'user-info': {
      'informations-personnelles': 'Informations personnelles',
      'uid': 'UID',
      'nom': 'Nom',
      'prenom': 'Prénom',
      'bod': 'Date de naissance',
      'email': 'Mail',
      'modifier': 'Modifier',
      'annuler': 'Annuler',
    },
  },
}

describe('informationPersonnelle', () => {
  const defaultProps = {
    uid: 'recia-999',
    nom: 'Dupont',
    prenom: 'Jean',
    dateNaissance: '01/01/1980',
    userMail: 'jean.dupont@recia.fr',
    userId: '123',
    userInfoApiUrl: 'https://api.test.fr/userinfo',
    mceApi: 'https://api.test.fr',
    canModifyEmail: false,
  }

  let wrapper: VueWrapper

  beforeEach(() => {
    vi.clearAllMocks()
    const i18n = createI18n({ legacy: false, locale: 'fr', fallbackLocale: 'fr', messages })
    wrapper = mount(InformationPersonnelle, {
      props: defaultProps,
      global: {
        plugins: [i18n],
        provide: { [I18nInjectionKey as symbol]: i18n },
        stubs: { ChangeEmail: true },
      },
    })
  })

  // --------------------------------------------------
  // RENDU INITIAL & TRADUCTIONS
  // --------------------------------------------------
  describe('rendu des données et labels', () => {
    it('affiche le titre de la section traduit', () => {
      expect(wrapper.find('h2').text()).toBe('Informations personnelles')
    })

    it('affiche correctement tous les labels et valeurs utilisateur', () => {
      const labels = wrapper.findAll('.info-label').map(el => el.text())
      expect(labels).toContain('UID')
      expect(labels).toContain('Mail')

      const values = wrapper.findAll('.info-value').map(el => el.text())
      expect(values).toContain('recia-999')
      expect(values).toContain('jean.dupont@recia.fr')
    })

    it('affiche un tiret si les propriétés sont absentes', () => {
      const i18n = createI18n({ legacy: false, locale: 'fr', messages })
      const wrapperEmpty = mount(InformationPersonnelle, {
        props: { userId: '123', userInfoApiUrl: '', mceApi: '', uid: '' },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as symbol]: i18n },
        },
      })
      wrapperEmpty.findAll('.info-value').forEach(val => expect(val.text()).toBe('—'))
    })

    it('renvoie les clés brutes si i18n est absent', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const wrapperNoI18n = mount(InformationPersonnelle, {
        props: defaultProps,
        global: { provide: {} },
      })
      expect(wrapperNoI18n.find('h2').text()).toBe('informations-personnelles')
      warnSpy.mockRestore()
    })
  })

  // --------------------------------------------------
  // GESTION DES DROITS
  // --------------------------------------------------
  describe('gestion des droits (canModifyEmail)', () => {
    it('affiche le bouton "Modifier" si autorisé', () => {
      expect(wrapper.find('.btn-outline-modify').text()).toBe('Modifier')
    })

    it('masque le bouton si canModifyEmail est true', () => {
      const i18n = createI18n({ legacy: false, locale: 'fr', messages })
      const wrapperNoModify = mount(InformationPersonnelle, {
        props: { ...defaultProps, canModifyEmail: true },
        global: { plugins: [i18n], provide: { [I18nInjectionKey as symbol]: i18n } },
      })
      expect(wrapperNoModify.find('.btn-outline-modify').exists()).toBe(false)
    })
  })

  // --------------------------------------------------
  // INTERACTIONS PANNEAU EMAIL
  // --------------------------------------------------
  describe('ouverture et fermeture du panneau', () => {
    it('ouvre/ferme le panneau et bascule le texte du bouton', async () => {
      const btn = wrapper.find('.btn-outline-modify')
      await btn.trigger('click')
      expect(wrapper.find('.edit-section-panel').exists()).toBe(true)
      expect(btn.text()).toBe('Annuler')

      await btn.trigger('click')
      expect(wrapper.find('.edit-section-panel').exists()).toBe(false)
      expect(btn.text()).toBe('Modifier')
    })

    it('ferme le panneau sur réception de l\'événement "close"', async () => {
      await wrapper.find('.btn-outline-modify').trigger('click')
      await wrapper.findComponent(ChangeEmail).vm.$emit('close')
      await nextTick()
      expect(wrapper.find('.edit-section-panel').exists()).toBe(false)
    })
  })

  // --------------------------------------------------
  // ÉVÉNEMENTS & RÉACTIVITÉ
  // --------------------------------------------------
  describe('propagation et réactivité', () => {
    it('émet "emailUpdated" et met à jour l\'affichage local lors de la réussite', async () => {
      await wrapper.find('.btn-outline-modify').trigger('click')
      const fakeMail = 'nouveau@recia.fr'
      await wrapper.findComponent(ChangeEmail).vm.$emit('updated', fakeMail)
      await nextTick()

      expect(wrapper.find('.email-bold').text()).toBe(fakeMail)
      expect(wrapper.emitted('emailUpdated')?.[0]).toEqual([fakeMail])
    })

    it('actualise l\'affichage via le watcher props.userMail', async () => {
      await wrapper.setProps({ userMail: 'mutation@recia.fr' })
      await nextTick()
      expect(wrapper.find('.email-bold').text()).toBe('mutation@recia.fr')
    })

    it('ignore la mise à jour vide dans le watcher', async () => {
      await wrapper.setProps({ userMail: '' })
      await nextTick()
      expect(wrapper.find('.email-bold').text()).toBe('jean.dupont@recia.fr')
    })
  })
})
