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
import { updateEmail, verifyEmail } from '@/services/serviceMce'
import ChangeEmail from '../components/ChangeEmail.ce.vue'

vi.mock('@/services/serviceMce.ts', () => ({
  updateEmail: vi.fn(),
  verifyEmail: vi.fn(),
}))

const mockApiResponse = {
  data: { code: 'VERIFICATION_SENT', message: 'Un email de vérification a été envoyé' },
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
      'error-required': 'Tous les champs sont obligatoires.',
      'error-format': 'Le format de l\'email est invalide.',
      'error-mismatch': 'Les emails ne correspondent pas.',
      'error-default': 'Erreur lors de la modification.',
      'no-email': 'No email address provided.',
      'verification-sent': 'Un email de vérification vous a été envoyé.',
      'code-sent': 'Un code de vérification à 6 chiffres vous a été envoyé.',
      'verification-code': 'Code de vérification',
      'code-placeholder': 'Entrez le code à 6 chiffres',
      'verify': 'Vérifier',
      'verified': 'Adresse email vérifiée avec succès !',
      'code-error-format': 'Le code doit contenir exactement 6 chiffres.',
      'resend': 'Renvoyer le code',
    },
  },
}

async function submitForm(w: VueWrapper) {
  await w.find('form').trigger('submit')
  await nextTick()
  await nextTick()
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

  describe('rendu initial', () => {
    it('affiche le titre dans un h3', () => {
      expect(wrapper.find('h3').text()).toBe('Modifier l\'adresse email')
    })

    it('affiche l\'email actuel fourni dans les props', () => {
      expect(wrapper.find('.static-value').text()).toBe('ancien@test.fr')
    })

    it('affiche le texte par défaut si aucun email actuel n\'est transmis', () => {
      const i18n = createI18n({ locale: 'fr', messages })
      const wrapperEmpty = mount(ChangeEmail, {
        props: { ...props, currentEmail: undefined },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        },
      })
      expect(wrapperEmpty.find('.static-value').text()).toBe('No email address provided.')
    })

    it('le bouton a le bon texte initial', () => {
      const submitBtn = wrapper.find('.btn-primary')
      expect(submitBtn.text()).toBe('Valider')
    })

    it('aucun message d\'alerte au départ', () => {
      expect(wrapper.find('.alert-message').exists()).toBe(false)
    })
  })

  describe('validations', () => {
    it('erreur si les deux champs sont vides', async () => {
      await submitForm(wrapper)
      expect(wrapper.find('.alert-message').text()).toBe('Tous les champs sont obligatoires.')
    })

    it('erreur si le format du nouvel email est invalide', async () => {
      await wrapper.find('#newEmail').setValue('mauvais-format')
      await wrapper.find('#confirmEmail').setValue('mauvais-format')
      await submitForm(wrapper)
      expect(wrapper.find('.alert-message').text()).toBe('Le format de l\'email est invalide.')
    })

    it('erreur si les deux emails ne correspondent pas', async () => {
      await wrapper.find('#newEmail').setValue('vrai@test.fr')
      await wrapper.find('#confirmEmail').setValue('autre@test.fr')
      await submitForm(wrapper)
      expect(wrapper.find('.alert-message').text()).toBe('Les emails ne correspondent pas.')
    })

    it('le message d\'erreur a la classe CSS "alert-message--error"', async () => {
      await submitForm(wrapper)
      expect(wrapper.find('.alert-message').classes()).toContain('alert-message--error')
    })
  })

  describe('état de chargement', () => {
    it('passe en mode loading pendant l\'appel API', async () => {
      vi.mocked(updateEmail).mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 200, mockApiResponse)),
      )

      await wrapper.find('#newEmail').setValue('nouveau@test.fr')
      await wrapper.find('#confirmEmail').setValue('nouveau@test.fr')

      await wrapper.find('form').trigger('submit')
      await nextTick()

      const submitBtn = wrapper.find('.btn-primary')
      expect(submitBtn.text()).toBe('...')
      expect(submitBtn.attributes('disabled')).toBe('')
    })
  })

  describe('succès et appels API', () => {
    it('affiche le formulaire de code après envoi réussi', async () => {
      vi.mocked(updateEmail).mockResolvedValueOnce(mockApiResponse)

      await wrapper.find('#newEmail').setValue('nouveau@test.fr')
      await wrapper.find('#confirmEmail').setValue('nouveau@test.fr')
      await submitForm(wrapper)

      expect(wrapper.find('.verification-info').exists()).toBe(true)
      expect(wrapper.find('.verification-email').text()).toContain('nouveau@test.fr')
      expect(wrapper.find('form').exists()).toBe(false)
      expect(wrapper.find('#verificationCode').exists()).toBe(true)
    })

    it('appelle updateEmail avec les bons arguments', async () => {
      vi.mocked(updateEmail).mockResolvedValueOnce(mockApiResponse)

      await wrapper.find('#newEmail').setValue('nouveau@test.fr')
      await wrapper.find('#confirmEmail').setValue('nouveau@test.fr')
      await submitForm(wrapper)

      expect(updateEmail).toHaveBeenCalledWith(
        'https://api.test.fr',
        '123',
        'nouveau@test.fr',
        'nouveau@test.fr',
        'https://api.test.fr/userinfo',
      )
    })

    it('nettoie le slash final de mceApi', async () => {
      vi.mocked(updateEmail).mockResolvedValueOnce(mockApiResponse)

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
      await submitForm(wrapperSlash)

      expect(updateEmail).toHaveBeenCalledWith(
        'https://api.test.fr',
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
      )
    })
  })

  describe('vérification du code', () => {
    beforeEach(() => {
      vi.mocked(updateEmail).mockResolvedValue(mockApiResponse)
    })

    async function goToCodeStep(w: VueWrapper) {
      await w.find('#newEmail').setValue('nouveau@test.fr')
      await w.find('#confirmEmail').setValue('nouveau@test.fr')
      await submitForm(w)
    }

    it('affiche le champ de code après envoi réussi', async () => {
      await goToCodeStep(wrapper)

      expect(wrapper.find('#verificationCode').exists()).toBe(true)
      expect(wrapper.find('.btn-primary').text()).toBe('Vérifier')
    })

    it('affiche une erreur si le code ne fait pas 6 chiffres', async () => {
      await goToCodeStep(wrapper)

      await wrapper.find('#verificationCode').setValue('123')
      await wrapper.find('.btn-primary').trigger('click')
      await nextTick()
      await nextTick()

      expect(wrapper.find('.alert-message').text()).toBe('Le code doit contenir exactement 6 chiffres.')
    })

    it('appelle verifyEmail et affiche le succès', async () => {
      vi.mocked(verifyEmail).mockResolvedValueOnce({ data: { code: 'SUCCESS' } })

      await goToCodeStep(wrapper)
      await wrapper.find('#verificationCode').setValue('123456')
      await wrapper.find('.btn-primary').trigger('click')
      await nextTick()
      await nextTick()

      expect(verifyEmail).toHaveBeenCalledWith(
        'https://api.test.fr',
        '123',
        '123456',
        'https://api.test.fr/userinfo',
      )
      expect(wrapper.find('.success-message').exists()).toBe(true)
      expect(wrapper.find('.success-message').text()).toBe('Adresse email vérifiée avec succès !')
    })

    it('affiche une erreur si la vérification échoue', async () => {
      vi.mocked(verifyEmail).mockRejectedValueOnce({
        response: { data: { message: 'Code de verification invalide' } },
      })

      await goToCodeStep(wrapper)
      await wrapper.find('#verificationCode').setValue('000000')
      await wrapper.find('.btn-primary').trigger('click')
      await nextTick()
      await nextTick()

      expect(wrapper.find('.alert-message').text()).toBe('Code de verification invalide')
      expect(wrapper.find('.alert-message').classes()).toContain('alert-message--error')
    })
  })

  describe('erreurs de l\'API', () => {
    it('affiche le message d\'une erreur de type Error', async () => {
      vi.mocked(updateEmail).mockRejectedValueOnce(new Error('Erreur de connexion réseau'))

      await wrapper.find('#newEmail').setValue('nouveau@test.fr')
      await wrapper.find('#confirmEmail').setValue('nouveau@test.fr')
      await submitForm(wrapper)

      const alert = wrapper.find('.alert-message')
      expect(alert.text()).toBe('Erreur de connexion réseau')
      expect(alert.classes()).toContain('alert-message--error')
    })

    it('affiche le message spécifique renvoyé par le serveur', async () => {
      vi.mocked(updateEmail).mockRejectedValueOnce({
        response: { data: { message: 'Cette adresse email est déjà utilisée.' } },
      })

      await wrapper.find('#newEmail').setValue('deja@pris.fr')
      await wrapper.find('#confirmEmail').setValue('deja@pris.fr')
      await submitForm(wrapper)

      expect(wrapper.find('.alert-message').text()).toBe('Cette adresse email est déjà utilisée.')
    })

    it('affiche le message par défaut si la structure de l\'erreur est inconnue', async () => {
      vi.mocked(updateEmail).mockRejectedValueOnce({ structure: 'inattendue' })

      await wrapper.find('#newEmail').setValue('nouveau@test.fr')
      await wrapper.find('#confirmEmail').setValue('nouveau@test.fr')
      await submitForm(wrapper)

      expect(wrapper.find('.alert-message').text()).toBe('Erreur lors de la modification.')
    })
  })
})
