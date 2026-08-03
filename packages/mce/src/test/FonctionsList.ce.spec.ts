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
import type { PersonneFonction } from '@/types/fonctionType.ts'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createI18n, I18nInjectionKey } from 'vue-i18n'
import { updateFonctionDateFin } from '@/services/serviceMce.ts'
import FonctionsList from '../components/FonctionsList.ce.vue'

vi.mock('@/services/serviceMce.ts', () => ({
  updateFonctionDateFin: vi.fn(),
}))

const messages = {
  fr: {
    'info-general': {
      'title-fonction': 'Mes fonctions',
    },
    'fonctions-list': {
      'card-label': 'Fonctions',
      'toggle-activate': 'Activer',
      'toggle-deactivate': 'Désactiver',
    },
  },
}

function createFonction(overrides: Partial<PersonneFonction> = {}): PersonneFonction {
  return {
    idFonction: 1,
    fonction: 'Professeur',
    discipline: 'Mathématiques',
    structure: 'Lycée Jean Zay',
    struct: { name: 'Lycée Jean Zay', type: 'LYC' },
    codeF: 'f1',
    codeD: 'd1',
    siren: 123456789,
    source: 'TEST',
    active: true,
    ...overrides,
  } as unknown as PersonneFonction
}

describe('fonctionsList', () => {
  let wrapper: VueWrapper

  const i18n = createI18n({ legacy: false, locale: 'fr', messages })

  const props = {
    fonctions: [
      createFonction({ idFonction: 1, active: true }),
      createFonction({ idFonction: 2, active: false, discipline: 'Physique' }),
    ],
    userInfoApiUrl: 'https://api.test.fr/userinfo',
    mceApi: 'https://api.test.fr/mce/',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(FonctionsList, {
      props,
      global: {
        plugins: [i18n],
        provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
      },
    })
  })

  // --------------------------------------------------
  // RENDU
  // --------------------------------------------------
  describe('rendu', () => {
    it('affiche le titre dans un h3', () => {
      // Template : <h3>{{ tGeneral('title-fonction') }}</h3>
      expect(wrapper.find('h3').text()).toBe('Mes fonctions')
    })

    it('affiche toutes les lignes .fonction-row', () => {
      expect(wrapper.findAll('.fonction-row')).toHaveLength(2)
    })

    it('affiche le nom de l\'établissement via .etab-name', () => {
      expect(wrapper.find('.etab-name').text()).toContain('Lycée Jean Zay')
    })

    it('affiche la fonction via .tag.tag-primary', () => {
      const firstRow = wrapper.findAll('.fonction-row')[0]
      expect(firstRow.findAll('.tag.tag-primary')[0].text()).toBe('Professeur')
    })

    it('affiche la discipline via .tag.tag-primary', () => {
      const firstRow = wrapper.findAll('.fonction-row')[0]
      expect(firstRow.findAll('.tag.tag-primary')[1].text()).toBe('Mathématiques')
    })

    it('ajoute un libellé accessible pour la bascule', () => {
      const checkbox = wrapper.findAll('.toggle-input')[0]
      expect(checkbox.attributes('aria-label')).toBe('Désactiver, Lycée Jean Zay, Professeur, Mathématiques')
    })
  })

  // --------------------------------------------------
  // CAS VIDE
  // --------------------------------------------------
  describe('cas vide', () => {
    it('ne rend rien si fonctions est vide (v-if)', () => {
      const emptyWrapper = mount(FonctionsList, {
        props: { fonctions: [], userInfoApiUrl: '', mceApi: '' },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        },
      })
      // v-if="fonctions?.length" → pas de section rendue
      expect(emptyWrapper.find('.profile-card').exists()).toBe(false)
    })
  })

  // --------------------------------------------------
  // TOGGLE – SUCCÈS
  // --------------------------------------------------
  describe('toggle – succès', () => {
    it('appelle updateFonctionDateFin avec le bon URL (supprime /mce/ du mceApi)', async () => {
      vi.mocked(updateFonctionDateFin).mockResolvedValueOnce(undefined as any)

      const checkbox = wrapper.findAll('.toggle-input')[1]
      await checkbox.setValue(true)
      await checkbox.trigger('change')

      // mceApi = 'https://api.test.fr/mce/' → baseUrl = 'https://api.test.fr'
      expect(updateFonctionDateFin).toHaveBeenCalledWith(
        'https://api.test.fr',
        2,
        true,
        'https://api.test.fr/userinfo',
      )
    })

    it('permet de basculer avec la touche Entrée', async () => {
      vi.mocked(updateFonctionDateFin).mockResolvedValueOnce(undefined as any)

      const checkbox = wrapper.findAll('.toggle-input')[1]
      await checkbox.trigger('keydown.enter')

      expect(updateFonctionDateFin).toHaveBeenCalledWith(
        'https://api.test.fr',
        2,
        true,
        'https://api.test.fr/userinfo',
      )
    })
  })

  // --------------------------------------------------
  // TOGGLE – ERREUR (ROLLBACK)
  // --------------------------------------------------
  describe('toggle – erreur et rollback', () => {
    it('restaure la valeur précédente si l\'API échoue', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      vi.mocked(updateFonctionDateFin).mockRejectedValueOnce(new Error('fail'))

      const checkbox = wrapper.findAll('.toggle-input')[0]
      const initialChecked = (checkbox.element as HTMLInputElement).checked // true

      await checkbox.setValue(!initialChecked)
      await checkbox.trigger('change')
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      const updated = wrapper.findAll('.toggle-input')[0]
      expect((updated.element as HTMLInputElement).checked).toBe(initialChecked)

      consoleSpy.mockRestore()
    })

    it('log une erreur si idFonction est absent', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const wrapperNoId = mount(FonctionsList, {
        props: {
          fonctions: [createFonction({ idFonction: undefined as any })],
          userInfoApiUrl: '',
          mceApi: '',
        },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        },
      })
      const checkbox = wrapperNoId.find('.toggle-input')
      await checkbox.setValue(true)
      await checkbox.trigger('change')
      expect(consoleSpy).toHaveBeenCalledWith('Missing idFonction', expect.anything())
      consoleSpy.mockRestore()
    })
  })

  // --------------------------------------------------
  // SANS I18N
  // --------------------------------------------------
  describe('sans i18n', () => {
    it('renvoie les clés brutes si i18n est absent', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const noI18nWrapper = mount(FonctionsList, {
        props,
        global: { provide: {} },
      })
      // tGeneral sans i18n retourne la clé : 'title-fonction'
      expect(noI18nWrapper.find('h3').text()).toBe('title-fonction')
      warnSpy.mockRestore()
    })
  })
})
