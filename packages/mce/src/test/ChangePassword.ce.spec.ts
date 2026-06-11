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
import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { createI18n, I18nInjectionKey } from 'vue-i18n'
import { postPassword } from '@/services/serviceMce.ts'
import ChangePassword from '../components/ChangePassword.ce.vue'

vi.mock('@/services/serviceMce.ts', () => ({
  postPassword: vi.fn(),
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
    'change-password': {
      'title': 'Changer mon mot de passe',
      'current-password': 'Mot de passe actuel',
      'new-password': 'Nouveau mot de passe',
      'confirm-password': 'Confirmer le nouveau mot de passe',
      'placeholder-current': 'Entrez votre mot de passe actuel',
      'placeholder-new': 'Au moins 8 caractères',
      'placeholder-confirm': 'Répétez votre mot de passe',
      'submit': 'Changer le mot de passe',
      'loading': 'Chargement...',
      'error-required': 'Tous les champs sont obligatoires.',
      'error-mismatch': 'Les nouveaux mots de passe ne correspondent pas.',
      'error-length': 'Le nouveau mot de passe doit contenir au moins 8 caractères.',
      'success': 'Mot de passe changé avec succès.',
      'error-default': 'Erreur lors du changement du mot de passe.',
    },
  },
}

describe('changePassword', () => {
  const props = {
    userInfoApiUrl: 'https://api.test.fr/userinfo',
    userId: '123',
    mceApi: 'https://api.test.fr',
  }

  let wrapper: VueWrapper

  beforeEach(() => {
    vi.clearAllMocks()
    const i18n = createI18n({ locale: 'fr', messages })
    wrapper = mount(ChangePassword, {
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
    // Le template utilise <h3>, pas <h2>
    it('affiche le titre dans un h3', () => {
      expect(wrapper.find('h3').text()).toBe('Changer mon mot de passe')
    })

    it('affiche les 3 labels', () => {
      const labels = wrapper.findAll('.info-label')
      expect(labels[0].text()).toBe('Mot de passe actuel')
      expect(labels[1].text()).toBe('Nouveau mot de passe')
      expect(labels[2].text()).toBe('Confirmer le nouveau mot de passe')
    })

    it('affiche les placeholders des inputs', () => {
      expect(wrapper.find('#current-password').attributes('placeholder')).toBe('Entrez votre mot de passe actuel')
      expect(wrapper.find('#new-password').attributes('placeholder')).toBe('Au moins 8 caractères')
      expect(wrapper.find('#confirm-password').attributes('placeholder')).toBe('Répétez votre mot de passe')
    })

    it('affiche le bouton submit avec le bon texte', () => {
      expect(wrapper.find('button[type="submit"]').text()).toBe('Changer le mot de passe')
    })

    it('le bouton submit est activé par défaut', () => {
      expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeUndefined()
    })

    it('les inputs sont de type password', () => {
      expect(wrapper.find('#current-password').attributes('type')).toBe('password')
      expect(wrapper.find('#new-password').attributes('type')).toBe('password')
      expect(wrapper.find('#confirm-password').attributes('type')).toBe('password')
    })

    it('aucun message d\'alerte au départ', () => {
      expect(wrapper.find('.alert-message').exists()).toBe(false)
    })

    it('les inputs sont vides au départ', () => {
      expect((wrapper.find('#current-password').element as HTMLInputElement).value).toBe('')
      expect((wrapper.find('#new-password').element as HTMLInputElement).value).toBe('')
      expect((wrapper.find('#confirm-password').element as HTMLInputElement).value).toBe('')
    })
  })

  // --------------------------------------------------
  // VALIDATIONS
  // --------------------------------------------------
  describe('validations', () => {
    it('erreur si tous les champs sont vides', async () => {
      await wrapper.find('form').trigger('submit')
      await nextTick()
      expect(wrapper.find('.alert-message').text()).toBe('Tous les champs sont obligatoires.')
    })

    it('erreur si les mots de passe ne correspondent pas', async () => {
      await wrapper.find('#current-password').setValue('a')
      await wrapper.find('#new-password').setValue('abcdefgh')
      await wrapper.find('#confirm-password').setValue('differentPass')
      await wrapper.find('form').trigger('submit')
      await nextTick()
      expect(wrapper.find('.alert-message').text()).toContain('ne correspondent pas')
    })

    // La validation length est < 8 (pas < 12) dans le composant réel
    it('erreur si le nouveau mot de passe fait moins de 8 caractères', async () => {
      await wrapper.find('#current-password').setValue('ancien')
      await wrapper.find('#new-password').setValue('short')
      await wrapper.find('#confirm-password').setValue('short')
      await wrapper.find('form').trigger('submit')
      await nextTick()
      expect(wrapper.find('.alert-message').text()).toContain('caractères')
    })

    it('le message d\'erreur a la classe CSS "error"', async () => {
      await wrapper.find('form').trigger('submit')
      await nextTick()
      expect(wrapper.find('.alert-message').classes()).toContain('error')
    })
  })

  // --------------------------------------------------
  // ÉTAT DE CHARGEMENT
  // --------------------------------------------------
  describe('état de chargement', () => {
    it('affiche "Chargement..." et désactive le bouton pendant la requête', async () => {
      vi.mocked(postPassword).mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 200, mockAxiosResponse)),
      )

      await wrapper.find('#current-password').setValue('ancien')
      await wrapper.find('#new-password').setValue('nouveaupass')
      await wrapper.find('#confirm-password').setValue('nouveaupass')

      await wrapper.find('form').trigger('submit')

      // attend le passage de isLoading = true + rerender
      await nextTick()

      const submitBtnLoading = wrapper.find('button[type="submit"]')
      expect(submitBtnLoading.text()).toBe('Chargement...')
      expect(submitBtnLoading.attributes('disabled')).toBeDefined()

      // optionnel : finir la promesse pour éviter fuite async
      await flushPromises()
    })
  })

  // --------------------------------------------------
  // SUCCÈS ET APPELS API
  // --------------------------------------------------
  describe('succès', () => {
    it('affiche le message de succès avec la classe "success"', async () => {
      vi.mocked(postPassword).mockResolvedValueOnce(mockAxiosResponse)
      await wrapper.find('#current-password').setValue('ancien')
      await wrapper.find('#new-password').setValue('nouveaupass')
      await wrapper.find('#confirm-password').setValue('nouveaupass')
      await wrapper.find('form').trigger('submit')
      await nextTick()

      const alert = wrapper.find('.alert-message')
      expect(alert.text()).toBe('Mot de passe changé avec succès.')
      expect(alert.classes()).toContain('success')
    })

    it('vide les trois champs après succès', async () => {
      vi.mocked(postPassword).mockResolvedValueOnce(mockAxiosResponse)
      await wrapper.find('#current-password').setValue('ancien')
      await wrapper.find('#new-password').setValue('nouveaupass')
      await wrapper.find('#confirm-password').setValue('nouveaupass')
      await wrapper.find('form').trigger('submit')
      await flushPromises()

      expect((wrapper.find('#current-password').element as HTMLInputElement).value).toBe('')
      expect((wrapper.find('#new-password').element as HTMLInputElement).value).toBe('')
      expect((wrapper.find('#confirm-password').element as HTMLInputElement).value).toBe('')
    })

    it('appelle postPassword avec les bons arguments', async () => {
      vi.mocked(postPassword).mockResolvedValueOnce(mockAxiosResponse)
      await wrapper.find('#current-password').setValue('ancien')
      await wrapper.find('#new-password').setValue('nouveaupass')
      await wrapper.find('#confirm-password').setValue('nouveaupass')
      await wrapper.find('form').trigger('submit')
      await nextTick()

      expect(postPassword).toHaveBeenCalledWith(
        'https://api.test.fr/123/change-password',
        'ancien',
        'nouveaupass',
        'nouveaupass',
        'https://api.test.fr/userinfo',
      )
    })

    it('construit l\'URL sans double slash si mceApi finit par /', async () => {
      vi.mocked(postPassword).mockResolvedValueOnce(mockAxiosResponse)
      const i18n = createI18n({ locale: 'fr', messages })
      const wrapperSlash = mount(ChangePassword, {
        props: { ...props, mceApi: 'https://api.test.fr/' },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        },
      })
      await wrapperSlash.find('#current-password').setValue('ancien')
      await wrapperSlash.find('#new-password').setValue('nouveaupass')
      await wrapperSlash.find('#confirm-password').setValue('nouveaupass')
      await wrapperSlash.find('form').trigger('submit')
      await nextTick()

      expect(postPassword).toHaveBeenCalledWith(
        'https://api.test.fr/123/change-password',
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
      )
    })
  })

  // --------------------------------------------------
  // ERREURS DE L'API
  // --------------------------------------------------
  describe('erreurs API', () => {
    it('affiche le message serveur si response.data.message est défini', async () => {
      vi.mocked(postPassword).mockRejectedValueOnce({
        response: { data: { message: 'Ancien mot de passe incorrect.' } },
      })
      await wrapper.find('#current-password').setValue('ancien')
      await wrapper.find('#new-password').setValue('nouveaupass')
      await wrapper.find('#confirm-password').setValue('nouveaupass')
      await wrapper.find('form').trigger('submit')
      await nextTick()

      const alert = wrapper.find('.alert-message')
      expect(alert.text()).toBe('Ancien mot de passe incorrect.')
      expect(alert.classes()).toContain('error')
    })

    it('affiche le message d\'erreur par défaut si l\'API échoue sans message structuré', async () => {
      vi.mocked(postPassword).mockRejectedValueOnce(new Error('réseau'))
      await wrapper.find('#current-password').setValue('ancien')
      await wrapper.find('#new-password').setValue('nouveaupass')
      await wrapper.find('#confirm-password').setValue('nouveaupass')
      await wrapper.find('form').trigger('submit')
      await nextTick()
      expect(wrapper.find('.alert-message').text()).toBe('Erreur lors du changement du mot de passe.')
    })
  })
})
