/**
 * Copyright (C) 2023 GIP-RECIA, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { VueWrapper } from '@vue/test-utils'
import type { PersonneFonction } from '@/types/fonctionType'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createI18n, I18nInjectionKey } from 'vue-i18n'
import { updateFonctionDateFin } from '@/services/serviceMce.ts'
import FonctionsList from './FonctionsList.ce.vue'

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
    },
  },
}

function createFonction(
  overrides: Partial<PersonneFonction> = {},
): PersonneFonction {
  return {
    idFonction: 1,
    fonction: 'Professeur',
    discipline: 'Mathématiques',

    // attendu par le type
    structure: 'Lycée Jean Zay',

    // utilisé dans le template
    struct: {
      name: 'Lycée Jean Zay',
      type: 'LYC',
    },

    codeF: 'f1',
    codeD: 'd1',

    // attendu en number
    siren: 123456789,

    source: 'TEST',
    active: true,

    ...overrides,
  } as unknown as PersonneFonction
}

describe('fonctionsList.ce.vue', () => {
  let wrapper: VueWrapper

  const i18n = createI18n({
    legacy: false,
    locale: 'fr',
    messages,
  })

  const props = {
    fonctions: [
      createFonction({
        idFonction: 1,
        active: true,
      }),

      createFonction({
        idFonction: 2,
        active: false,
        discipline: 'Physique',
      }),
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

        provide: {
          [I18nInjectionKey as symbol]: i18n,
        },
      },
    })
  })

  // --------------------------------------------------
  // RENDU
  // --------------------------------------------------

  it('affiche le titre correctement', () => {
    expect(wrapper.find('h2.titre').text())
      .toBe('Mes fonctions')
  })

  it('affiche toutes les cartes', () => {
    expect(wrapper.findAll('.card-fonction'))
      .toHaveLength(2)
  })

  it('affiche les informations de fonction', () => {
    const firstCard = wrapper.findAll('.card-fonction')[0]

    expect(firstCard.find('.struct-name').text())
      .toContain('Lycée Jean Zay')

    expect(firstCard.find('.fonction-tag').text())
      .toBe('Professeur')

    expect(firstCard.find('.discipline-tag').text())
      .toBe('Mathématiques')
  })

  it('affiche le label correctement', () => {
    expect(wrapper.find('.card-label').text())
      .toBe('Fonctions')
  })

  // --------------------------------------------------
  // CAS VIDE
  // --------------------------------------------------

  it('ne rend rien si fonctions est vide', () => {
    const emptyWrapper = mount(FonctionsList, {
      props: {
        fonctions: [],
        userInfoApiUrl: '',
        mceApi: '',
      },

      global: {
        plugins: [i18n],

        provide: {
          [I18nInjectionKey as symbol]: i18n,
        },
      },
    })

    expect(emptyWrapper.find('.section-fonction').exists())
      .toBe(false)
  })

  // --------------------------------------------------
  // TOGGLE SUCCESS
  // --------------------------------------------------

  it('appelle l’API avec le bon identifiant numérique', async () => {
    const checkbox = wrapper.findAll('.toggle-input')[1]

    await checkbox.setValue(true)
    await checkbox.trigger('change')

    expect(updateFonctionDateFin).toHaveBeenCalledWith(
      'https://api.test.fr/fonction/2/dateFin',
      true,
      'https://api.test.fr/userinfo',
    )
  })

  // --------------------------------------------------
  // TOGGLE ERROR
  // --------------------------------------------------

  it('rollback la valeur si erreur API', async () => {
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    vi.mocked(updateFonctionDateFin)
      .mockRejectedValueOnce(new Error('fail'))

    const checkbox = wrapper.findAll('.toggle-input')[0]

    const initialValue = (
      checkbox.element as HTMLInputElement
    ).checked

    await checkbox.setValue(!initialValue)

    await checkbox.trigger('change')

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    const updatedCheckbox = wrapper.findAll('.toggle-input')[0]

    expect(
      (updatedCheckbox.element as HTMLInputElement).checked,
    ).toBe(initialValue)

    consoleSpy.mockRestore()
  })

  // --------------------------------------------------
  // I18N ABSENT
  // --------------------------------------------------

  it('fallback i18n si absent', () => {
    const warnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {})

    const noI18nWrapper = mount(FonctionsList, {
      props,

      global: {
        provide: {},
      },
    })

    expect(noI18nWrapper.find('.titre').text())
      .toBe('title-fonction')

    expect(noI18nWrapper.find('.card-label').text())
      .toBe('card-label')

    warnSpy.mockRestore()
  })
})
