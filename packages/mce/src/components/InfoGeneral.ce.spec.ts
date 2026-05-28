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

import type { General } from '@/types/generalType'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ClassesGroupesEleve from './ClassesGroupesEleve.ce.vue'
import ClassesGroupesProf from './ClassesGroupesProf.ce.vue'
import InfoGeneral from './InfoGeneral.ce.vue'

describe('infoGeneral', () => {
  const defaultProps = {
    details: {} as General,
    listFonctions: [],
    listMenu: 'GENERALE',
    mceApi: 'https://api.mce.local',
    parentEleve: undefined,
    apprentis: undefined,
    relationEleve: undefined,
    userInfoApiUrl: 'https://api.user.local',
  }

  const globalConfig = {
    stubs: {
      RelationUser: true,
      ClassesGroupesProf: true,
      ClassesGroupesEleve: true,
    },
  }

  // --------------------------------------------------
  // GESTION DES RELATIONS PARENTS / ÉLÈVES
  // --------------------------------------------------
  describe('gestion de l\'affichage des relations parents / élèves', () => {
    it('ne doit pas afficher relation-user pour "student" par défaut si aucune donnée', () => {
      const wrapper = shallowMount(InfoGeneral, {
        props: defaultProps,
        global: globalConfig,
      })
      const relationUsers = wrapper.findAll('relation-user-stub, relation-user')
      const studentBlock = relationUsers.find(el => el.attributes('titre') === 'student')
      expect(studentBlock).toBeUndefined()
    })

    it('affiche relation-user si parentEleve contient un tableau non vide', () => {
      const wrapper = shallowMount(InfoGeneral, {
        props: { ...defaultProps, parentEleve: [{ id: 1, name: 'Élève A' }] },
        global: globalConfig,
      })
      const studentBlock = wrapper.find('relation-user-stub, relation-user')
      expect(studentBlock.exists()).toBe(true)
      expect(studentBlock.attributes('titre')).toBe('student')
    })

    it('affiche relation-user si parentEleve contient un objet non vide', () => {
      const wrapper = shallowMount(InfoGeneral, {
        props: { ...defaultProps, parentEleve: { id: 2, name: 'Élève B' } },
        global: globalConfig,
      })
      const studentBlock = wrapper.find('relation-user-stub, relation-user')
      expect(studentBlock.exists()).toBe(true)
      expect(studentBlock.attributes('titre')).toBe('student')
    })

    it('affiche relation-user si relationEleve contient des données (et les priorise)', () => {
      const wrapper = shallowMount(InfoGeneral, {
        props: {
          ...defaultProps,
          relationEleve: [{ id: 3, name: 'Élève Croisé' }],
          parentEleve: [{ id: 1, name: 'Élève A' }],
        },
        global: globalConfig,
      })
      const studentBlock = wrapper.find('relation-user-stub, relation-user')
      expect(studentBlock.exists()).toBe(true)
      expect(studentBlock.attributes('titre')).toBe('student')
      expect(studentBlock.attributes('details')).toBeDefined()
    })

    it('se replie sur parentEleve si relationEleve est absent ou vide', () => {
      const wrapper = shallowMount(InfoGeneral, {
        props: { ...defaultProps, relationEleve: undefined, parentEleve: [{ id: 4, name: 'Élève Parent' }] },
        global: globalConfig,
      })
      const studentBlock = wrapper.find('relation-user-stub, relation-user')
      expect(studentBlock.exists()).toBe(true)
      expect(studentBlock.attributes('details')).toBeDefined()
    })
  })

  // --------------------------------------------------
  // GESTION DES APPRENTIS
  // --------------------------------------------------
  describe('gestion de l\'affichage des apprentis', () => {
    it('ne renvoie rien si la prop apprentis vaut undefined', () => {
      const wrapper = shallowMount(InfoGeneral, {
        props: { ...defaultProps, apprentis: undefined },
        global: globalConfig,
      })
      const masterBlock = wrapper.findAll('relation-user-stub, relation-user').find(el => el.attributes('titre') === 'master')
      expect(masterBlock).toBeUndefined()
    })

    it('ne doit pas afficher relation-user pour "master" si vide', () => {
      const wrapper = shallowMount(InfoGeneral, {
        props: { ...defaultProps, apprentis: [] },
        global: globalConfig,
      })
      const masterBlock = wrapper.findAll('relation-user-stub, relation-user').find(el => el.attributes('titre') === 'master')
      expect(masterBlock).toBeUndefined()
    })

    it('affiche relation-user pour "master" si apprentis est un tableau rempli', () => {
      const wrapper = shallowMount(InfoGeneral, {
        props: { ...defaultProps, apprentis: [{ id: 10, name: 'Apprenti A' }] },
        global: globalConfig,
      })
      const masterBlock = wrapper.find('relation-user-stub, relation-user')
      expect(masterBlock.exists()).toBe(true)
      expect(masterBlock.attributes('titre')).toBe('master')
    })

    it('affiche relation-user pour "master" si apprentis est un objet rempli', () => {
      const wrapper = shallowMount(InfoGeneral, {
        props: { ...defaultProps, apprentis: { uniqueKey: { id: 20, name: 'Apprenti B' } } },
        global: globalConfig,
      })
      const masterBlock = wrapper.find('relation-user-stub, relation-user')
      expect(masterBlock.exists()).toBe(true)
      expect(masterBlock.attributes('titre')).toBe('master')
    })
  })

  // --------------------------------------------------
  // ARBITRAGE CLASSES / GROUPES
  // --------------------------------------------------
  describe('arbitrage d\'affichage entre ClassesGroupesProf et ClassesGroupesEleve', () => {
    it('affiche ClassesGroupesProf si la sectionProf contient des établissements', () => {
      const detailsProf = {
        sectionClassesGroupes: { sectionProf: { etabs: { 'Lycée Test': [{ matiere: 'SVT' }] } } },
      } as unknown as General
      const wrapper = shallowMount(InfoGeneral, {
        props: { ...defaultProps, details: detailsProf },
        global: globalConfig,
      })
      expect(wrapper.findComponent(ClassesGroupesProf).exists()).toBe(true)
      expect(wrapper.findComponent(ClassesGroupesEleve).exists()).toBe(false)
    })

    it('affiche ClassesGroupesEleve si sectionProf est absent mais sectionEleve possède des établissements', () => {
      const detailsEleve = {
        sectionClassesGroupes: {
          sectionEleve: { etabs: [{ nameEtab: 'Collège Test', classes: ['4EME'], groupes: [] }], enseignementSuivis: [] },
        },
      } as unknown as General
      const wrapper = shallowMount(InfoGeneral, {
        props: { ...defaultProps, details: detailsEleve },
        global: globalConfig,
      })
      expect(wrapper.findComponent(ClassesGroupesProf).exists()).toBe(false)
      expect(wrapper.findComponent(ClassesGroupesEleve).exists()).toBe(true)
    })

    it('affiche ClassesGroupesEleve si sectionEleve ne contient pas d\'établissements mais possède des enseignements suivis', () => {
      const detailsEleveMatiere = {
        sectionClassesGroupes: {
          sectionEleve: { etabs: [], enseignementSuivis: ['Mathématiques'] },
        },
      } as unknown as General
      const wrapper = shallowMount(InfoGeneral, {
        props: { ...defaultProps, details: detailsEleveMatiere },
        global: globalConfig,
      })
      expect(wrapper.findComponent(ClassesGroupesEleve).exists()).toBe(true)
    })

    it('ne doit afficher aucun des deux blocs si sectionClassesGroupes est indéfini', () => {
      const detailsVides = { sectionClassesGroupes: undefined } as unknown as General
      const wrapper = shallowMount(InfoGeneral, {
        props: { ...defaultProps, details: detailsVides },
        global: globalConfig,
      })
      expect(wrapper.findComponent(ClassesGroupesProf).exists()).toBe(false)
      expect(wrapper.findComponent(ClassesGroupesEleve).exists()).toBe(false)
    })
  })
})
