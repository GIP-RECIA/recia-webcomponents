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
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { createI18n, I18nInjectionKey } from 'vue-i18n'
import { updateEmail } from '@/services/serviceMce.ts'
import ChangeEmail from '../components/ChangeEmail.ce.vue'

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
      'no-email': 'No email address provided.',
    },
  },
}

async function submitForm(w: VueWrapper) {
  await w.find('form').trigger('submit')
  // Premier nextTick : handleSubmit s'exécute (validations synchrones ou résolution Promise)
  await nextTick()
  // Deuxième nextTick : les await nextTick() internes au composant mettent à jour le DOM
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

  // --------------------------------------------------
  // RENDU INITIAL
  // --------------------------------------------------
  describe('rendu initial', () => {
    it('affiche le titre dans un h3', () => {
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
      expect(wrapperEmpty.find('.static-value').text()).toBe('No email address provided.')
    })

    it('applique le bon placeholder sur le champ newEmail', () => {
      expect(wrapper.find('#newEmail').attributes('placeholder')).toBe('exemple@domaine.fr')
    })

    it('le bouton a le bon texte initial', () => {
      const submitBtn = wrapper.find('.btn-primary')
      expect(submitBtn.text()).toBe('Valider')
    })

    it('aucun message d\'alerte au départ', () => {
      expect(wrapper.find('.alert-message').exists()).toBe(false)
    })
  })

  // --------------------------------------------------
  // VALIDATIONS
  // --------------------------------------------------
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

  // --------------------------------------------------
  // ÉTAT DE CHARGEMENT
  // --------------------------------------------------
  describe('état de chargement', () => {
    it('passe en mode loading pendant l\'appel API', async () => {
      // La promesse ne se résout pas pendant ce test : on observe l'état intermédiaire
      vi.mocked(updateEmail).mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 200, mockAxiosResponse)),
      )

      await wrapper.find('#newEmail').setValue('nouveau@test.fr')
      await wrapper.find('#confirmEmail').setValue('nouveau@test.fr')

      // On déclenche le submit mais on n'attend PAS la fin de handleSubmit
      await wrapper.find('form').trigger('submit')
      await nextTick()

      const submitBtn = wrapper.find('.btn-primary')
      expect(submitBtn.text()).toBe('...')
      // attributes('disabled') renvoie "" quand l'attribut est présent
      expect(submitBtn.attributes('disabled')).toBe('')
    })
  })

  // --------------------------------------------------
  // SUCCÈS ET APPELS API
  // --------------------------------------------------
  describe('succès et appels API', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('affiche le message de réussite et émet "updated" après 1 seconde', async () => {
      vi.mocked(updateEmail).mockResolvedValueOnce(mockAxiosResponse)

      await wrapper.find('#newEmail').setValue('nouveau@test.fr')
      await wrapper.find('#confirmEmail').setValue('nouveau@test.fr')
      await submitForm(wrapper)

      const alert = wrapper.find('.alert-message')
      expect(alert.text()).toBe('Email mis à jour avec succès !')
      expect(alert.classes()).toContain('alert-message--success')

      vi.advanceTimersByTime(1000)

      expect(wrapper.emitted('updated')).toBeTruthy()
      expect(wrapper.emitted('updated')?.[0]).toEqual(['nouveau@test.fr'])
    })

    it('appelle updateEmail avec les bons arguments', async () => {
      vi.mocked(updateEmail).mockResolvedValueOnce(mockAxiosResponse)

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
      await submitForm(wrapperSlash)

      expect(updateEmail).toHaveBeenCalledWith(
        'https://api.test.fr',
        '123',
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
    it('affiche le message d\'une erreur de type Error (instanceof Error)', async () => {
      vi.mocked(updateEmail).mockRejectedValueOnce(new Error('Erreur de connexion réseau'))

      await wrapper.find('#newEmail').setValue('nouveau@test.fr')
      await wrapper.find('#confirmEmail').setValue('nouveau@test.fr')
      await submitForm(wrapper)

      const alert = wrapper.find('.alert-message')
      expect(alert.text()).toBe('Erreur de connexion réseau')
      expect(alert.classes()).toContain('alert-message--error')
    })

    it('affiche le message spécifique renvoyé par le serveur s\'il existe', async () => {
      vi.mocked(updateEmail).mockRejectedValueOnce({
        response: { data: { message: 'Cette adresse email est déjà utilisée.' } },
      })

      await wrapper.find('#newEmail').setValue('deja@pris.fr')
      await wrapper.find('#confirmEmail').setValue('deja@pris.fr')
      await submitForm(wrapper)

      expect(wrapper.find('.alert-message').text()).toBe('Cette adresse email est déjà utilisée.')
    })

    it('affiche le message de traduction par défaut si la structure de l\'erreur est inconnue', async () => {
      vi.mocked(updateEmail).mockRejectedValueOnce({ structure: 'inattendue' })

      await wrapper.find('#newEmail').setValue('nouveau@test.fr')
      await wrapper.find('#confirmEmail').setValue('nouveau@test.fr')
      await submitForm(wrapper)

      expect(wrapper.find('.alert-message').text()).toBe('Erreur lors de la modification.')
    })
  })
})
