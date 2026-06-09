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
      'collapse-open': 'Ouvrir la section',
      'collapse-close': 'Fermer la section',
    },
  },
}

function makeI18n() {
  const i18n = createI18n({ locale: 'fr', messages })
  return {
    i18n,
    provide: {
      [I18nInjectionKey as symbol]: { global: i18n.global },
    },
  }
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

    const { i18n, provide } = makeI18n()
    wrapper = mount(ClassesGroupesProf, {
      props: defaultProps,
      global: { plugins: [i18n], provide },
    })
  })

  // --------------------------------------------------
  // STRUCTURE, EN-TÊTE ET COLLAPSE
  // --------------------------------------------------
  describe('structure, en-tête et collapse', () => {
    it('affiche le titre dans un h3', () => {
      // Template utilise <h3>, pas <h2>
      expect(wrapper.find('h3').text()).toBe('Mes classes et groupes pédagogiques')
    })

    it('affiche l\'icône de collapse "-" par défaut (ouvert)', () => {
      expect(wrapper.find('.collapse-icon').text()).toBe('-')
    })

    it('bascule l\'état lors du clic sur le header', async () => {
      const header = wrapper.find('.collapse-btn')
      expect(header.exists()).toBe(true)

      await header.trigger('click')
      await wrapper.vm.$nextTick()

      expect(header.attributes('aria-expanded')).toBe('false')
      expect(wrapper.find('.collapse-icon').text()).toBe('+')

      await header.trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.collapse-icon').text()).toBe('-')
      expect(header.attributes('aria-expanded')).toBe('true')
    })
    it('ajoute un aria-label accessible au bouton de collapse', () => {
      const header = wrapper.find('.collapse-btn')
      expect(header.attributes('aria-label')).toBe('Fermer la section')
      expect(header.attributes('title')).toBe('Fermer la section')
    })
  })

  // --------------------------------------------------
  // RENDU DES BLOCS SECTIONPROF
  // --------------------------------------------------
  describe('rendu des blocs de sectionProf', () => {
    it('affiche le nom de l\'établissement dans etab-info-side', () => {
      const etabBlock = wrapper.find('.etab-block')
      // Le nom est dans .etab-info-side > .info-value.info-value--bold
      expect(etabBlock.find('.etab-info-side .info-value').text()).toBe('Lycée Jean Zay')
    })

    it('affiche la matière dans .teaching-entry via info-value--bold', () => {
      const teachingEntry = wrapper.find('.teaching-entry')
      // La matière est dans .info-item > span.info-value.info-value--bold
      expect(teachingEntry.find('.info-value--bold').text()).toBe('Mathématiques')
    })

    it('affiche les badges de classes (.pill-tag--class) et groupes (.pill-tag--group)', () => {
      const etabBlock = wrapper.find('.etab-block')
      const classPills = etabBlock.findAll('.pill-tag--class').map(el => el.text())
      const groupPills = etabBlock.findAll('.pill-tag--group').map(el => el.text())
      expect(classPills).toContain('2NDE 1')
      expect(groupPills).toContain('MATHS SOUVENT')
    })

    it('affiche un libellé de secours "Discipline inconnue" si matiere et discipline sont absents', () => {
      const { i18n, provide } = makeI18n()
      const customWrapper = mount(ClassesGroupesProf, {
        props: {
          sectionProf: {
            etabs: {
              'Collège Camus': [
                { discipline: 'Histoire-Géo' },
                {},
              ],
            },
          } as unknown as SectionProf,
          listFonctions: [],
          sectionEleve: undefined,
        },
        global: { plugins: [i18n], provide },
      })
      const disciplineValues = customWrapper.findAll('.info-value--bold').map(el => el.text())
      expect(disciplineValues).toContain('Histoire-Géo')
      expect(disciplineValues).toContain('Discipline inconnue')
    })
  })

  // --------------------------------------------------
  // LOGIQUE DES FONCTIONS RESTANTES
  // --------------------------------------------------
  describe('gestion des fonctions restantes et cascade de priorités', () => {
    it('ignore les fonctions dont la discipline est déjà dans sectionProf', () => {
      // 'Espagnol' n'est pas dans sectionProf (Mathématiques y est), donc f1 Espagnol devrait apparaître
      // Ajoutons f2 avec Mathématiques (déjà traitée) → il ne doit pas apparaître
      defaultProps.listFonctions.push({
        idFonction: 'f2',
        discipline: 'Mathématiques',
        struct: { name: 'Lycée Jean Zay' },
        classes: ['AUTRE-CLASSE'],
        groupes: [],
      })
      const { i18n, provide } = makeI18n()
      const customWrapper = mount(ClassesGroupesProf, {
        props: defaultProps,
        global: { plugins: [i18n], provide },
      })
      expect(customWrapper.text()).not.toContain('AUTRE-CLASSE')
    })

    it('utilise f.cg.classes quand f.classes est vide', () => {
      const { i18n, provide } = makeI18n()
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
        global: { plugins: [i18n], provide },
      })
      expect(customWrapper.find('.pill-tag--class').text()).toBe('1ERE CG')
      expect(customWrapper.find('.pill-tag--group').text()).toBe('GROUP CG')
    })

    it('utilise le croisement avec sectionEleve en dernier recours', () => {
      const { i18n, provide } = makeI18n()
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
        global: { plugins: [i18n], provide },
      })
      expect(customWrapper.find('.pill-tag--class').text()).toBe('6EME ELEVE-FALLBACK')
      expect(customWrapper.find('.pill-tag--group').text()).toBe('GROUPE ELEVE-FALLBACK')
    })

    it('affiche "N/A" si struct ou struct.name est absent', () => {
      const { i18n, provide } = makeI18n()
      const customWrapper = mount(ClassesGroupesProf, {
        props: {
          sectionProf: undefined,
          sectionEleve: undefined,
          listFonctions: [{
            idFonction: 'f_no_struct',
            discipline: 'Physique',
            classes: ['TERMINALE'],
            groupes: [],
          }],
        },
        global: { plugins: [i18n], provide },
      })
      // f.struct?.name || 'N/A' → 'N/A'
      expect(customWrapper.find('.etab-info-side .info-value').text()).toBe('N/A')
    })
  })

  // --------------------------------------------------
  // SCÉNARIO SANS DONNÉES
  // --------------------------------------------------
  describe('scénario d\'absence de données', () => {
    it('affiche le message "Aucune donnée chargée." si sectionProf et listFonctions sont vides', () => {
      const { i18n, provide } = makeI18n()
      const emptyWrapper = mount(ClassesGroupesProf, {
        props: { sectionProf: undefined, listFonctions: [], sectionEleve: undefined },
        global: { plugins: [i18n], provide },
      })
      // v-if="!sectionProf && listFonctions.length === 0" → affiche tProf('no-data')
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
      expect(wrapperNoI18n.find('h3').text()).toBe('title-classe-groupe')
      expect(wrapperNoI18n.find('.info-label').text()).toBe('etablissement')
      warnSpy.mockRestore()
    })
  })
})
