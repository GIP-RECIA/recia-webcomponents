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
        provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        stubs: { ChangeEmail: true },
      },
    })
  })

  // --------------------------------------------------
  // RENDU DES DONNÉES ET LABELS
  // --------------------------------------------------
  describe('rendu des données et labels', () => {
    it('affiche le titre dans un h3', () => {
      // Template : <h3>{{ tUser('informations-personnelles') }}</h3>
      expect(wrapper.find('h3').text()).toBe('Informations personnelles')
    })

    it('affiche les labels UID et Mail', () => {
      const labels = wrapper.findAll('.info-label').map(el => el.text())
      expect(labels).toContain('UID')
      expect(labels).toContain('Mail')
    })

    it('affiche les valeurs recia-999 et l\'email', () => {
      const values = wrapper.findAll('.info-value').map(el => el.text())
      expect(values).toContain('recia-999')
      expect(values).toContain('jean.dupont@recia.fr')
    })

    it('affiche un tiret "—" si les propriétés uid/nom/prenom/dateNaissance sont absentes', () => {
      const i18n = createI18n({ legacy: false, locale: 'fr', messages })
      const wrapperEmpty = mount(InformationPersonnelle, {
        props: { userId: '123', userInfoApiUrl: '', mceApi: '', uid: '' },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        },
      })
      // uid='' → '—', nom absent → '—', prenom absent → '—', dateNaissance absent → '—'
      const ddValues = wrapperEmpty.findAll('dd.info-value').map(el => el.text())
      ddValues.forEach(val => expect(val).toBe('—'))
    })

    it('renvoie les clés brutes si i18n est absent', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const wrapperNoI18n = mount(InformationPersonnelle, {
        props: defaultProps,
        global: { provide: {} },
      })
      expect(wrapperNoI18n.find('h3').text()).toBe('informations-personnelles')
      warnSpy.mockRestore()
    })
  })

  // --------------------------------------------------
  // GESTION DES DROITS (canModifyEmail)
  // --------------------------------------------------
  describe('gestion des droits (canModifyEmail)', () => {
    it('affiche le bouton "Modifier" si canModifyEmail est false', () => {
      // Template : v-if="!props.canModifyEmail" → bouton .btn-primary affiché
      const btn = wrapper.find('.btn-primary')
      expect(btn.exists()).toBe(true)
      expect(btn.text()).toBe('Modifier')
    })

    it('masque le bouton si canModifyEmail est true', () => {
      const i18n = createI18n({ legacy: false, locale: 'fr', messages })
      const wrapperNoModify = mount(InformationPersonnelle, {
        props: { ...defaultProps, canModifyEmail: true },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        },
      })
      expect(wrapperNoModify.find('.btn-primary').exists()).toBe(false)
    })
  })

  // --------------------------------------------------
  // OUVERTURE ET FERMETURE DU PANNEAU
  // --------------------------------------------------
  describe('ouverture et fermeture du panneau email', () => {
    it('ouvre le panneau au premier clic et bascule le texte du bouton sur "Annuler"', async () => {
      const btn = wrapper.find('.btn-primary')
      await btn.trigger('click')
      expect(wrapper.find('.edit-section-panel').exists()).toBe(true)
      expect(btn.text()).toBe('Annuler')
    })

    it('ferme le panneau au second clic et remet "Modifier"', async () => {
      const btn = wrapper.find('.btn-primary')
      await btn.trigger('click')
      await btn.trigger('click')
      expect(wrapper.find('.edit-section-panel').exists()).toBe(false)
      expect(btn.text()).toBe('Modifier')
    })

    it('ferme le panneau sur réception de l\'événement "close" émis par ChangeEmail', async () => {
      await wrapper.find('.btn-primary').trigger('click')
      await wrapper.findComponent(ChangeEmail).vm.$emit('close')
      await nextTick()
      expect(wrapper.find('.edit-section-panel').exists()).toBe(false)
    })
  })

  // --------------------------------------------------
  // ÉVÉNEMENTS ET RÉACTIVITÉ
  // --------------------------------------------------
  describe('propagation et réactivité', () => {
    it('met à jour l\'email affiché et émet "emailUpdated" lors de la réussite', async () => {
      await wrapper.find('.btn-primary').trigger('click')
      const fakeMail = 'nouveau@recia.fr'
      await wrapper.findComponent(ChangeEmail).vm.$emit('updated', fakeMail)
      await nextTick()

      // L'email courant est dans .info-value--bold (currentEmail)
      expect(wrapper.find('.info-value--bold').text()).toBe(fakeMail)
      expect(wrapper.emitted('emailUpdated')?.[0]).toEqual([fakeMail])
    })

    it('ferme le panneau après handleEmailUpdated', async () => {
      await wrapper.find('.btn-primary').trigger('click')
      await wrapper.findComponent(ChangeEmail).vm.$emit('updated', 'test@test.fr')
      await nextTick()
      expect(wrapper.find('.edit-section-panel').exists()).toBe(false)
    })

    it('actualise l\'email affiché via le watcher props.userMail', async () => {
      await wrapper.setProps({ userMail: 'mutation@recia.fr' })
      await nextTick()
      expect(wrapper.find('.info-value--bold').text()).toBe('mutation@recia.fr')
    })

    it('ignore une mise à jour vide dans le watcher (garde la valeur précédente)', async () => {
      await wrapper.setProps({ userMail: '' })
      await nextTick()
      // La valeur initiale 'jean.dupont@recia.fr' doit rester (watch ignore les falsy)
      expect(wrapper.find('.info-value--bold').text()).toBe('jean.dupont@recia.fr')
    })
  })
})
