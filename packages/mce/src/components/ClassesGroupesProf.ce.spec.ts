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
import type { SectionEleve, SectionProf } from '@/types/generalType'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createI18n, I18nInjectionKey } from 'vue-i18n'
import ClassesGroupesProf from './ClassesGroupesProf.ce.vue'

// 1. Mocks et messages
const messages = {
  fr: {
    'info-general': {
      'title-classe-groupe': 'Mes classes et groupes pédagogiques',
      'class': 'Classe',
      'group': 'Groupe',
    },
    'classes-groupes-prof': {
      'etablissement': 'Établissement',
      'discipline': 'Discipline / Matière',
      'no-data': 'Aucune donnée chargée.',
      'discipline-unknown': 'Discipline inconnue',
    },
  },
}

describe('classesGroupesProf', () => {
  let defaultProps: {
    sectionProf: SectionProf | undefined
    listFonctions: any[]
    sectionEleve: SectionEleve | undefined
  }

  let wrapper: VueWrapper

  beforeEach(() => {
    vi.clearAllMocks()

    defaultProps = {
      sectionProf: {
        etabs: {
          'Lycée Jean Zay': [
            {
              matiere: 'Mathématiques',
              cg: { classes: ['2NDE 1'], groupes: ['MATHS SOUVENT'] },
            },
          ],
        },
      } as unknown as SectionProf,
      listFonctions: [
        {
          idFonction: 'f1',
          discipline: 'Espagnol',
          struct: { name: 'Lycée Jean Zay' },
          classes: ['2NDE 2'],
          groupes: [],
        },
      ],
      sectionEleve: {
        etabs: [
          {
            nameEtab: 'Lycée Jean Zay',
            classes: ['3EME ELEVE'],
            groupes: ['GROUPE ELEVE'],
          },
        ],
      } as unknown as SectionEleve,
    }

    const i18n = createI18n({ locale: 'fr', messages })
    wrapper = mount(ClassesGroupesProf, {
      props: defaultProps,
      global: {
        plugins: [i18n],
        provide: { [I18nInjectionKey as unknown as string]: i18n },
      },
    })
  })

  // --------------------------------------------------
  // RENDU DU HEADER & COLLAPSE
  // --------------------------------------------------
  describe('structure, en-tête et collapse', () => {
    it('affiche le titre de la section et l\'icône de collapse par défaut', () => {
      expect(wrapper.find('h2').text()).toBe('Mes classes et groupes pédagogiques')
      expect(wrapper.find('.collapse-icon').text()).toBe('-')
    })

    it('bascule l\'état d\'affichage du corps lors du clic sur le header', async () => {
      const header = wrapper.find('.clickable-header')
      await header.trigger('click')
      expect(wrapper.find('.collapse-icon').text()).toBe('+')
      expect(wrapper.find('.card-body-grid').exists()).toBe(false)
      await header.trigger('click')
      expect(wrapper.find('.collapse-icon').text()).toBe('-')
      expect(wrapper.find('.card-body-grid').exists()).toBe(true)
    })
  })

  // --------------------------------------------------
  // RENDU DES SECTIONS PROF
  // --------------------------------------------------
  describe('rendu des blocs de sectionProf', () => {
    it('affiche correctement l\'établissement, la matière et ses badges', () => {
      const etabBlock = wrapper.find('.etab-block')
      expect(etabBlock.find('.etab-info-side .info-value').text()).toBe('Lycée Jean Zay')
      expect(etabBlock.find('.teaching-entry .name-bold').text()).toBe('Mathématiques')
      const classPills = etabBlock.findAll('.pill-class').map(el => el.text())
      const groupPills = etabBlock.findAll('.pill-group').map(el => el.text())
      expect(classPills).toContain('2NDE 1')
      expect(groupPills).toContain('MATHS SOUVENT')
    })

    it('affiche un libellé de secours pour la discipline', () => {
      const i18n = createI18n({ locale: 'fr', messages })
      const customWrapper = mount(ClassesGroupesProf, {
        props: {
          sectionProf: {
            etabs: {
              'Collège Camus': [
                { discipline: 'Histoire-Géo' },
                { },
              ],
            },
          } as unknown as SectionProf,
          listFonctions: [],
          sectionEleve: undefined,
        },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as unknown as string]: i18n },
        },
      })
      const disciplineValues = customWrapper.findAll('.teaching-entry .name-bold').map(el => el.text())
      expect(disciplineValues).toContain('Histoire-Géo')
      expect(disciplineValues).toContain('Discipline inconnue')
    })
  })

  // --------------------------------------------------
  // LOGIQUE DES FONCTIONS & PRIORITÉS
  // --------------------------------------------------
  describe('gestion des fonctions restantes et cascade de priorités', () => {
    it('ignore les fonctions dont la discipline est déjà traitée', () => {
      defaultProps.listFonctions.push({
        idFonction: 'f2',
        discipline: 'Mathématiques',
        classes: ['AUTRE-CLASSE'],
      })
      const i18n = createI18n({ locale: 'fr', messages })
      const customWrapper = mount(ClassesGroupesProf, {
        props: defaultProps,
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as unknown as string]: i18n },
        },
      })
      const disciplinesAffichees = customWrapper.findAll('.teaching-entry .name-bold').map(el => el.text())
      expect(disciplinesAffichees).toContain('Espagnol')
      expect(customWrapper.text()).not.toContain('AUTRE-CLASSE')
    })

    it('applique la priorité f.cg.classes si f.classes n\'est pas renseigné', () => {
      const i18n = createI18n({ locale: 'fr', messages })
      const customWrapper = mount(ClassesGroupesProf, {
        props: {
          sectionProf: undefined,
          sectionEleve: undefined,
          listFonctions: [{
            idFonction: 'f_cg',
            discipline: 'Anglais',
            struct: { name: 'Lycée A' },
            cg: { classes: ['1ERE CG'], groupes: ['GROUP CG'] },
          }],
        },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as unknown as string]: i18n },
        },
      })
      expect(customWrapper.find('.pill-class').text()).toBe('1ERE CG')
      expect(customWrapper.find('.pill-group').text()).toBe('GROUP CG')
    })

    it('applique le croisement de secours avec sectionEleve', () => {
      const i18n = createI18n({ locale: 'fr', messages })
      const customWrapper = mount(ClassesGroupesProf, {
        props: {
          sectionProf: undefined,
          listFonctions: [{
            idFonction: 'f_fallback',
            discipline: 'Arts Plastiques',
            struct: { name: 'Collège National' },
          }],
          sectionEleve: {
            etabs: [{
              nameEtab: 'Collège National',
              classes: ['6EME ELEVE-FALLBACK'],
              groupes: ['GROUPE ELEVE-FALLBACK'],
            }],
          } as unknown as SectionEleve,
        },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as unknown as string]: i18n },
        },
      })
      expect(customWrapper.find('.pill-class').text()).toBe('6EME ELEVE-FALLBACK')
      expect(customWrapper.find('.pill-group').text()).toBe('GROUPE ELEVE-FALLBACK')
    })

    it('gère l\'absence d\'attribut struct ou name sans planter', () => {
      const i18n = createI18n({ locale: 'fr', messages })
      const customWrapper = mount(ClassesGroupesProf, {
        props: {
          sectionProf: undefined,
          sectionEleve: undefined,
          listFonctions: [{
            idFonction: 'f_no_struct',
            discipline: 'Physique',
            classes: ['TERMINALE'],
          }],
        },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as unknown as string]: i18n },
        },
      })
      expect(customWrapper.find('.etab-info-side .info-value').text()).toBe('N/A')
    })
  })

  // --------------------------------------------------
  // SCÉNARIO SANS DONNÉES
  // --------------------------------------------------
  describe('scénario d\'absence de données', () => {
    it('affiche un message explicite lorsqu\'aucune donnée n\'est présente', () => {
      const i18n = createI18n({ locale: 'fr', messages })
      const emptyWrapper = mount(ClassesGroupesProf, {
        props: { sectionProf: undefined, listFonctions: [], sectionEleve: undefined },
        global: {
          plugins: [i18n],
          provide: { [I18nInjectionKey as unknown as string]: i18n },
        },
      })
      expect(emptyWrapper.find('.info-value').text()).toBe('Aucune donnée chargée.')
    })
  })

  // --------------------------------------------------
  // BRANCHE ALTERNATIVE SANS I18N
  // --------------------------------------------------
  describe('branche alternative sans i18n', () => {
    it('renvoie les clés de traduction brutes si le plugin i18n est absent', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const wrapperNoI18n = mount(ClassesGroupesProf, {
        props: defaultProps,
        global: { provide: {} },
      })
      expect(wrapperNoI18n.find('h2').text()).toBe('title-classe-groupe')
      expect(wrapperNoI18n.find('.info-label').text()).toBe('etablissement')
      warnSpy.mockRestore()
    })
  })
})
