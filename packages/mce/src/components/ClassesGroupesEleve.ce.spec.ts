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

      'no-class': 'Aucune classe',
      'no-group': 'Aucun groupe',
      'no-etab': 'Aucun établissement',
      'no-course': 'Aucun enseignement',
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
    ] as Etabs[],
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
    it('affiche les titres des deux sections traduits correctement', () => {
      const headers = wrapper.findAll('h3').map(el => el.text())
      expect(headers).toContain('Mes classes et groupes pédagogiques')
      expect(headers).toContain('Enseignements suivis')
    })
  })

  // --------------------------------------------------
  // DONNÉES COMPLÈTES
  // --------------------------------------------------
  describe('rendu avec des données complètes', () => {
    it('affiche la liste des établissements', () => {
      const rows = wrapper.findAll('.etab-row-item')
      expect(rows).toHaveLength(2)
    })

    it('affiche le nom de l\'établissement via info-value--bold', () => {
      const rows = wrapper.findAll('.etab-row-item')
      expect(rows[0].find('.info-value--bold').text()).toBe('Lycée Jean Zay')
    })

    it('affiche les labels Classe et Groupe et leurs valeurs', () => {
      const rows = wrapper.findAll('.etab-row-item')
      expect(rows[0].text()).toContain('Classe')
      expect(rows[0].text()).toContain('2NDE 1')
      expect(rows[0].text()).toContain('Groupe')
      expect(rows[0].text()).toContain('ANGLAIS LV1')
    })

    it('affiche la liste des matières suivies sous forme de badges .pill-tag', () => {
      const pills = wrapper.findAll('.enseignements-list .pill-tag').map(el => el.text())
      expect(pills).toHaveLength(3)
      expect(pills).toContain('Mathématiques')
      expect(pills).toContain('Physique-Chimie')
      expect(pills).toContain('Histoire-Géographie')
    })
  })

  // --------------------------------------------------
  // MULTI-VALEURS (correction bug [0])
  // --------------------------------------------------
  describe('affichage de toutes les classes et groupes', () => {
    it('affiche toutes les classes d\'un établissement quand il y en a plusieurs', () => {
      const i18n = createI18n({ locale: 'fr', messages })
      const wrapperMulti = mount(ClassesGroupesEleve, {
        props: {
          etabs: [{
            nameEtab: 'Lycée Test',
            classes: ['2NDE 1', '2NDE 2', 'CPGE'],
            groupes: ['ANGLAIS LV1', 'ESPAGNOL LV2'],
          }] as Etabs[],
          sectionEleve: { enseignementSuivis: [] } as unknown as SectionEleve,
        },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        },
      })
      const row = wrapperMulti.find('.etab-row-item')
      const classPills = row.findAll('.pills-list').at(0)!.findAll('.pill-tag').map(el => el.text())
      expect(classPills).toHaveLength(3)
      expect(classPills).toContain('2NDE 1')
      expect(classPills).toContain('2NDE 2')
      expect(classPills).toContain('CPGE')
    })

    it('affiche tous les groupes d\'un établissement quand il y en a plusieurs', () => {
      const i18n = createI18n({ locale: 'fr', messages })
      const wrapperMulti = mount(ClassesGroupesEleve, {
        props: {
          etabs: [{
            nameEtab: 'Lycée Test',
            classes: ['2NDE 1'],
            groupes: ['ANGLAIS LV1', 'ESPAGNOL LV2'],
          }] as Etabs[],
          sectionEleve: { enseignementSuivis: [] } as unknown as SectionEleve,
        },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        },
      })
      const row = wrapperMulti.find('.etab-row-item')
      const groupPills = row.findAll('.pills-list').at(1)!.findAll('.pill-tag').map(el => el.text())
      expect(groupPills).toHaveLength(2)
      expect(groupPills).toContain('ANGLAIS LV1')
      expect(groupPills).toContain('ESPAGNOL LV2')
    })
  })

  // --------------------------------------------------
  // GESTION DES VALEURS VIDES (FALLBACKS)
  // --------------------------------------------------
  describe('gestion des valeurs vides ou manquantes', () => {
    it('affiche un tiret si la liste des groupes est vide', () => {
      const rows = wrapper.findAll('.etab-row-item')
      expect(rows[1].find('.info-value--bold').text()).toBe('Collège Albert Camus')
      const groupPillsList = rows[1].findAll('.pills-list').at(1)!
      expect(groupPillsList.find('.pill-tag').exists()).toBe(false)
      expect(groupPillsList.find('.info-value').text()).toBe('—')
    })

    it('affiche un tiret si la liste des classes est vide', () => {
      const i18n = createI18n({ locale: 'fr', messages })
      const wrapperEmpty = mount(ClassesGroupesEleve, {
        props: {
          etabs: [{ nameEtab: 'Lycée Test', classes: [], groupes: [] }] as Etabs[],
          sectionEleve: { enseignementSuivis: [] } as unknown as SectionEleve,
        },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        },
      })
      const row = wrapperEmpty.find('.etab-row-item')
      const classPillsList = row.findAll('.pills-list').at(0)!
      expect(classPillsList.find('.pill-tag').exists()).toBe(false)
      expect(classPillsList.find('.info-value').text()).toBe('—')
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
          provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        },
      })
      expect(wrapperEmpty.find('.enseignements-list .pill-tag').exists()).toBe(false)
      expect(wrapperEmpty.find('.enseignements-list').text()).toBe('—')
    })

    it('affiche un tiret de secours si sectionEleve est indéfini', () => {
      const i18n = createI18n({ locale: 'fr', messages })
      const wrapperUndefined = mount(ClassesGroupesEleve, {
        props: { etabs: [] as Etabs[], sectionEleve: undefined },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        },
      })
      expect(wrapperUndefined.find('.enseignements-list .pill-tag').exists()).toBe(false)
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
      expect(wrapperNoI18n.find('h3').text()).toBe('title-classe-groupe')
      expect(wrapperNoI18n.find('.info-label').text()).toBe('etablissement')
      warnSpy.mockRestore()
    })
  })
})
