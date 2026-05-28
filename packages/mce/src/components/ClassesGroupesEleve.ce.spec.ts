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
import type { Etabs, SectionEleve } from '@/types/generalType'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createI18n, I18nInjectionKey } from 'vue-i18n'
import ClassesGroupesEleve from './ClassesGroupesEleve.ce.vue'

// 1. Mocks et messages
const messages = {
  fr: {
    'info-general': {
      'title-classe-groupe': 'Mes classes et groupes pédagogiques',
      'title-courses': 'Enseignements suivis',
      'class': 'Classe',
      'group': 'Groupe',
    },
    'classes-groupes-eleve': {
      'etablissement': 'Établissement',
      'matieres-suivies': 'Matières suivies',
    },
  },
}

describe('classesGroupesEleve', () => {
  const defaultProps = {
    etabs: [
      {
        nameEtab: 'Lycée Jean Zay',
        classes: ['2NDE 1'],
        groupes: ['ANGLAIS LV1'],
      },
      {
        nameEtab: 'Collège Albert Camus',
        classes: ['3EME 2'],
        groupes: [],
      },
    ],
    sectionEleve: {
      enseignementSuivis: ['Mathématiques', 'Physique-Chimie', 'Histoire-Géographie'],
    } as unknown as SectionEleve,
  }

  let wrapper: VueWrapper

  beforeEach(() => {
    vi.clearAllMocks()
    const i18n = createI18n({ locale: 'fr', messages })
    wrapper = mount(ClassesGroupesEleve, {
      props: defaultProps,
      global: {
        plugins: [i18n],
        provide: { [I18nInjectionKey as unknown as string]: i18n },
      },
    })
  })

  // --------------------------------------------------
  // RENDU INITIAL
  // --------------------------------------------------
  describe('rendu initial', () => {
    it('affiche les titres des deux sections traduits correctement', () => {
      const headers = wrapper.findAll('h2').map(el => el.text())
      expect(headers).toContain('Mes classes et groupes pédagogiques')
      expect(headers).toContain('Enseignements suivis')
    })
  })

  // --------------------------------------------------
  // DONNÉES COMPLÈTES
  // --------------------------------------------------
  describe('rendu avec des données complètes', () => {
    it('affiche la liste des établissements avec leurs classes et groupes respectifs', () => {
      const rows = wrapper.findAll('.etab-row-item')
      expect(rows).toHaveLength(2)
      expect(rows[0].find('.etab-name-bold').text()).toBe('Lycée Jean Zay')
      expect(rows[0].text()).toContain('Classe')
      expect(rows[0].text()).toContain('2NDE 1')
      expect(rows[0].text()).toContain('Groupe')
      expect(rows[0].text()).toContain('ANGLAIS LV1')
    })

    it('affiche la liste des matières suivies sous forme de badges', () => {
      const pills = wrapper.findAll('.pill-tag').map(el => el.text())
      expect(pills).toHaveLength(3)
      expect(pills).toContain('Mathématiques')
      expect(pills).toContain('Physique-Chimie')
      expect(pills).toContain('Histoire-Géographie')
    })
  })

  // --------------------------------------------------
  // GESTION DES VALEURS VIDES (FALLBACKS)
  // --------------------------------------------------
  describe('gestion des valeurs vides ou manquantes', () => {
    it('affiche un tiret de secours si une classe ou un groupe est manquant', () => {
      const rows = wrapper.findAll('.etab-row-item')
      expect(rows[1].find('.etab-name-bold').text()).toBe('Collège Albert Camus')
      const values = rows[1].findAll('.info-value').map(el => el.text())
      expect(values).toContain('3EME 2')
      expect(values).toContain('—')
    })

    it('affiche un tiret de secours si la liste des enseignements suivis est vide', () => {
      const i18n = createI18n({ locale: 'fr', messages })
      const wrapperEmpty = mount(ClassesGroupesEleve, {
        props: {
          etabs: [] as Etabs[],
          sectionEleve: { enseignementSuivis: [] } as unknown as SectionEleve,
        },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as unknown as string]: i18n },
        },
      })
      expect(wrapperEmpty.find('.pill-tag').exists()).toBe(false)
      expect(wrapperEmpty.find('.enseignements-list').text()).toBe('—')
    })

    it('affiche un tiret de secours si sectionEleve est indéfini', () => {
      const i18n = createI18n({ locale: 'fr', messages })
      const wrapperUndefined = mount(ClassesGroupesEleve, {
        props: { etabs: [] as Etabs[], sectionEleve: undefined },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as unknown as string]: i18n },
        },
      })
      expect(wrapperUndefined.find('.pill-tag').exists()).toBe(false)
      expect(wrapperUndefined.find('.enseignements-list').text()).toBe('—')
    })
  })

  // --------------------------------------------------
  // BRANCHE ALTERNATIVE (SANS I18N)
  // --------------------------------------------------
  describe('branche alternative sans i18n', () => {
    it('renvoie les clés de traduction brutes si le plugin i18n est absent', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const wrapperNoI18n = mount(ClassesGroupesEleve, {
        props: defaultProps,
        global: { provide: {} },
      })
      expect(wrapperNoI18n.find('h2').text()).toBe('title-classe-groupe')
      expect(wrapperNoI18n.find('.info-label').text()).toBe('etablissement')
      warnSpy.mockRestore()
    })
  })
})
