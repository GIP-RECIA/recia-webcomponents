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

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { I18nInjectionKey } from 'vue-i18n'
import RelationUserDetail from './RelationUserDetail.ce.vue'

describe('relationUserDetail', () => {
  const mockI18n = {
    global: {
      t: (key: string) => key.replace('relation-user-detail.', ''),
    },
  }

  const defaultProps = {
    personne: {
      userName: 'Jean Dupont',
      bod: '2010-05-15',
      userMail: 'jean.dupont@test.fr',
      etab: 'Lycée Test',
      uid: '12345',
      etat: 'Actif',
      mdp: true,
      fonctionClassesGroupe: {
        sectionClassesGroupes: {
          sectionEleve: {
            etabs: [
              { classes: ['6eA'], listGroupes: ['Anglais'], groupe: 'Groupe 1' },
            ],
          },
        },
      },
      enseignementsSuivis: ['Maths'],
      parentEleve: [{ displayNameRelation: 'Marie Dupont', lienParente: 'Mère', autoriteParental: true }],
    },
    isLoading: false,
    hasError: false,
  }

  const mountOptions = {
    props: defaultProps,
    global: {
      provide: {
        [I18nInjectionKey as any]: mockI18n,
      },
    },
  }

  // --------------------------------------------------
  // ÉTATS DE CHARGEMENT ET ERREURS
  // --------------------------------------------------
  describe('états de chargement et erreurs', () => {
    it('affiche le bloc de chargement si isLoading est true', () => {
      const wrapper = mount(RelationUserDetail, {
        props: { ...defaultProps, isLoading: true },
        global: mountOptions.global,
      })
      expect(wrapper.find('.detail-loading').exists()).toBe(true)
    })

    it('affiche le bloc d\'erreur si hasError est true', () => {
      const wrapper = mount(RelationUserDetail, {
        props: { ...defaultProps, hasError: true },
        global: mountOptions.global,
      })
      expect(wrapper.find('.detail-error').exists()).toBe(true)
    })
  })

  // --------------------------------------------------
  // GESTION DES AVATARS (INITIALES)
  // --------------------------------------------------
  describe('gestion de l\'avatar et des initiales', () => {
    it('calcule correctement les initiales (Prénom Nom)', () => {
      const wrapper = mount(RelationUserDetail, mountOptions)
      expect(wrapper.find('.avatar-fallback').text()).toBe('JD')
    })

    it('calcule les initiales pour un nom unique', () => {
      const wrapper = mount(RelationUserDetail, {
        ...mountOptions,
        props: { ...defaultProps, personne: { userName: 'Elon' } },
      })
      expect(wrapper.find('.avatar-fallback').text()).toBe('E')
    })

    it('gère l\'absence d\'initiales avec un point d\'interrogation', () => {
      const wrapper = mount(RelationUserDetail, {
        ...mountOptions,
        props: { ...defaultProps, personne: { userName: '' } },
      })
      expect(wrapper.find('.avatar-fallback').text()).toBe('?')
    })
  })

  // --------------------------------------------------
  // DONNÉES UTILISATEUR ET FORMATAGE
  // --------------------------------------------------
  describe('données utilisateur et rendu', () => {
    it('formate correctement la date de naissance', () => {
      const wrapper = mount(RelationUserDetail, mountOptions)
      expect(wrapper.text()).toContain('15/05/2010')
    })

    it('affiche les listes de classes et groupes', () => {
      const wrapper = mount(RelationUserDetail, mountOptions)
      expect(wrapper.find('.data-tag.classe').text()).toBe('6eA')
      expect(wrapper.find('.data-tag.groupe').text()).toBe('Anglais')
    })

    it('émet l\'événement "close" lors du clic sur le bouton fermeture', async () => {
      const wrapper = mount(RelationUserDetail, mountOptions)
      await wrapper.find('.btn-close').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
    })
  })

  // --------------------------------------------------
  // BRANCHES LOGIQUES COMPUTED
  // --------------------------------------------------
  describe('logique métier (computed)', () => {
    it('gère le cas des établissements sans classes/groupes', () => {
      const emptyEtabProps = {
        ...defaultProps,
        personne: { fonctionClassesGroupe: { sectionClassesGroupes: { sectionEleve: { etabs: [{}] } } } },
      }
      const wrapper = mount(RelationUserDetail, { ...mountOptions, props: emptyEtabProps })
      expect(wrapper.find('.data-tag').exists()).toBe(false)
    })
  })
})
