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
import { updateEmail } from '@/services/serviceMce.ts'
import ChangeEmail from './ChangeEmail.ce.vue'

// 1. Mocks globaux
vi.mock('@/services/serviceMce.ts', () => ({
  updateEmail: vi.fn(),
}))

const mockAxiosResponse = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: { headers: {} as any },
}

const messages = {
  fr: {
    'change-email': {
      'title': 'Modifier l\'adresse email',
      'current-email': 'Email actuel',
      'new-email': 'Nouvel email',
      'confirm-email': 'Confirmation du nouvel email',
      'placeholder': 'exemple{\'@\'}domaine.fr',
      'cancel': 'Annuler',
      'submit': 'Valider',
      'loading': '...',
      'success': 'Email mis à jour avec succès !',
      'error-required': 'Tous les champs sont obligatoires.',
      'error-format': 'Le format de l\'email est invalide.',
      'error-mismatch': 'Les emails ne correspondent pas.',
      'error-default': 'Erreur lors de la modification.',
    },
  },
}

describe('changeEmail', () => {
  const props = {
    userInfoApiUrl: 'https://api.test.fr/userinfo',
    userId: '123',
    currentEmail: 'ancien@test.fr',
    mceApi: 'https://api.test.fr',
  }

  let wrapper: VueWrapper

  beforeEach(() => {
    vi.clearAllMocks()
    const i18n = createI18n({ locale: 'fr', messages })
    wrapper = mount(ChangeEmail, {
      props,
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

  // --------------------------------------------------
  // RENDU INITIAL
  // --------------------------------------------------
  describe('rendu initial', () => {
    it('affiche le titre traduit', () => {
      expect(wrapper.find('h3').text()).toBe('Modifier l\'adresse email')
    })

    it('affiche l\'email actuel fourni dans les props', () => {
      expect(wrapper.find('.static-value').text()).toBe('ancien@test.fr')
    })

    it('affiche un tiret par défaut si aucun email actuel n\'est transmis', () => {
      const i18n = createI18n({ locale: 'fr', messages })
      const wrapperEmpty = mount(ChangeEmail, {
        props: { ...props, currentEmail: undefined },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        },
      })
      expect(wrapperEmpty.find('.static-value').text()).toBe('-')
    })

    it('applique le bon placeholder sur le champ newEmail', () => {
      expect(wrapper.find('#newEmail').attributes('placeholder')).toBe('exemple@domaine.fr')
    })

    it('les boutons ont les bons textes initiaux', () => {
      expect(wrapper.find('.btn-secondary').text()).toBe('Annuler')
      expect(wrapper.find('.btn-primary').text()).toBe('Valider')
    })
  })

  // --------------------------------------------------
  // ACTIONS DU PANNEAU
  // --------------------------------------------------
  describe('actions du panneau', () => {
    it('émet l\'événement "close" lors du clic sur le bouton Annuler', async () => {
      await wrapper.find('.btn-secondary').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
    })
  })

  // --------------------------------------------------
  // VALIDATIONS
  // --------------------------------------------------
  describe('validations', () => {
    it('erreur si l\'un des champs ou les deux sont vides', async () => {
      await wrapper.find('.btn-primary').trigger('click')
      await nextTick()
      const alert = wrapper.find('.alert-message')
      expect(alert.text()).toBe('Tous les champs sont obligatoires.')
    })

    it('erreur si le format du nouvel email est invalide', async () => {
      await wrapper.find('#newEmail').setValue('mauvais-format')
      await wrapper.find('#confirmEmail').setValue('mauvais-format')
      await wrapper.find('.btn-primary').trigger('click')
      await nextTick()
      const alert = wrapper.find('.alert-message')
      expect(alert.text()).toBe('Le format de l\'email est invalide.')
    })

    it('erreur si les deux emails ne correspondent pas', async () => {
      await wrapper.find('#newEmail').setValue('vrai@test.fr')
      await wrapper.find('#confirmEmail').setValue('autre@test.fr')
      await wrapper.find('.btn-primary').trigger('click')
      await nextTick()
      const alert = wrapper.find('.alert-message')
      expect(alert.text()).toBe('Les emails ne correspondent pas.')
    })
  })

  // --------------------------------------------------
  // ÉTAT DE CHARGEMENT
  // --------------------------------------------------
  describe('état de chargement', () => {
    it('passe en mode loading pendant l\'appel API', async () => {
      vi.mocked(updateEmail).mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 200, mockAxiosResponse)),
      )

      await wrapper.find('#newEmail').setValue('nouveau@test.fr')
      await wrapper.find('#confirmEmail').setValue('nouveau@test.fr')
      await wrapper.find('.btn-primary').trigger('click')
      await nextTick()

      const submitBtn = wrapper.find('.btn-primary')
      expect(submitBtn.text()).toBe('...')
      expect(submitBtn.attributes('disabled')).toBeDefined()
    })
  })

  // --------------------------------------------------
  // SUCCÈS ET APPELS API
  // --------------------------------------------------
  describe('succès et appels API', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    it('affiche le message de réussite et émet "updated" après 1 seconde', async () => {
      vi.mocked(updateEmail).mockResolvedValueOnce(mockAxiosResponse)

      await wrapper.find('#newEmail').setValue('nouveau@test.fr')
      await wrapper.find('#confirmEmail').setValue('nouveau@test.fr')
      await wrapper.find('.btn-primary').trigger('click')
      await nextTick()

      const alert = wrapper.find('.alert-message')
      expect(alert.text()).toBe('Email mis à jour avec succès !')
      expect(alert.classes()).toContain('success')

      vi.advanceTimersByTime(1000)

      expect(wrapper.emitted('updated')).toBeTruthy()
      expect(wrapper.emitted('updated')?.[0]).toEqual(['nouveau@test.fr'])
    })

    it('appelle updateEmail avec les bons arguments et nettoie l\'URL', async () => {
      vi.mocked(updateEmail).mockResolvedValueOnce(mockAxiosResponse)

      await wrapper.find('#newEmail').setValue('nouveau@test.fr')
      await wrapper.find('#confirmEmail').setValue('nouveau@test.fr')
      await wrapper.find('.btn-primary').trigger('click')
      await nextTick()

      expect(updateEmail).toHaveBeenCalledWith(
        'https://api.test.fr/123/update-email',
        'nouveau@test.fr',
        'nouveau@test.fr',
        'https://api.test.fr/userinfo',
      )
    })

    it('nettoie le slash final de mceApi pour éviter un double slash dans l\'URL', async () => {
      vi.mocked(updateEmail).mockResolvedValueOnce(mockAxiosResponse)

      const i18n = createI18n({ locale: 'fr', messages })
      const wrapperSlash = mount(ChangeEmail, {
        props: { ...props, mceApi: 'https://api.test.fr/' },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        },
      })

      await wrapperSlash.find('#newEmail').setValue('nouveau@test.fr')
      await wrapperSlash.find('#confirmEmail').setValue('nouveau@test.fr')
      await wrapperSlash.find('.btn-primary').trigger('click')
      await nextTick()

      expect(updateEmail).toHaveBeenCalledWith(
        'https://api.test.fr/123/update-email',
        expect.any(String),
        expect.any(String),
        expect.any(String),
      )
    })
  })

  // --------------------------------------------------
  // ERREURS DE L'API
  // --------------------------------------------------
  describe('erreurs de l\'API', () => {
    it('affiche le message d\'une erreur de type Native Error (instanceof Error)', async () => {
      vi.mocked(updateEmail).mockRejectedValueOnce(new Error('Erreur de connexion réseau'))

      await wrapper.find('#newEmail').setValue('nouveau@test.fr')
      await wrapper.find('#confirmEmail').setValue('nouveau@test.fr')
      await wrapper.find('.btn-primary').trigger('click')
      await nextTick()

      const alert = wrapper.find('.alert-message')
      expect(alert.text()).toBe('Erreur de connexion réseau')
      expect(alert.classes()).toContain('error')
    })

    it('affiche le message spécifique renvoyé par le serveur s\'il existe', async () => {
      vi.mocked(updateEmail).mockRejectedValueOnce({
        response: { data: { message: 'Cette adresse email est déjà utilisée.' } },
      })

      await wrapper.find('#newEmail').setValue('deja@pris.fr')
      await wrapper.find('#confirmEmail').setValue('deja@pris.fr')
      await wrapper.find('.btn-primary').trigger('click')
      await nextTick()

      const alert = wrapper.find('.alert-message')
      expect(alert.text()).toBe('Cette adresse email est déjà utilisée.')
    })

    it('affiche le message de traduction par défaut si la structure de l\'erreur est inconnue', async () => {
      vi.mocked(updateEmail).mockRejectedValueOnce({ structure: 'inattendue' })

      await wrapper.find('#newEmail').setValue('nouveau@test.fr')
      await wrapper.find('#confirmEmail').setValue('nouveau@test.fr')
      await wrapper.find('.btn-primary').trigger('click')
      await nextTick()

      const alert = wrapper.find('.alert-message')
      expect(alert.text()).toBe('Erreur lors de la modification.')
    })
  })
})
