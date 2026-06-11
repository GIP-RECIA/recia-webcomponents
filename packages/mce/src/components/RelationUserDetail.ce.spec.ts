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

// Mock i18n minimal : retourne la clé sans préfixe
const mockI18n = {
  global: {
    t: (key: string) => key.replace('relation-user-detail.', ''),
  },
}

const mountOptions = {
  global: {
    provide: {
      [I18nInjectionKey as any]: mockI18n,
    },
  },
}

const defaultPersonne = {
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
          {
            classes: ['6eA'],
            listGroupes: ['Anglais'],
          },
        ],
      },
    },
  },
  parentEleve: [
    { displayNameRelation: 'Marie Dupont', lienParente: 'Mère', autoriteParental: true },
  ],
}

const defaultProps = {
  personne: defaultPersonne,
  isLoading: false,
  hasError: false,
}

// --------------------------------------------------
// ÉTATS DE CHARGEMENT ET ERREURS
// --------------------------------------------------
describe('relationUserDetail', () => {
  describe('états de chargement et erreurs', () => {
    it('affiche le bloc de chargement si isLoading est true', () => {
      const wrapper = mount(RelationUserDetail, {
        props: { ...defaultProps, isLoading: true },
        global: mountOptions.global,
      })
      // Template : <div v-if="isLoading" class="alert-message alert-message--info">
      expect(wrapper.find('.alert-message--info').exists()).toBe(true)
    })

    it('n\'affiche pas le contenu si isLoading est true', () => {
      const wrapper = mount(RelationUserDetail, {
        props: { ...defaultProps, isLoading: true },
        global: mountOptions.global,
      })
      expect(wrapper.find('.detail-header').exists()).toBe(false)
    })

    it('affiche le bloc d\'erreur si hasError est true', () => {
      const wrapper = mount(RelationUserDetail, {
        props: { ...defaultProps, hasError: true },
        global: mountOptions.global,
      })
      // Template : <div v-else-if="hasError" class="alert-message alert-message--error">
      expect(wrapper.find('.alert-message--error').exists()).toBe(true)
    })

    it('n\'affiche pas le contenu si hasError est true', () => {
      const wrapper = mount(RelationUserDetail, {
        props: { ...defaultProps, hasError: true },
        global: mountOptions.global,
      })
      expect(wrapper.find('.detail-header').exists()).toBe(false)
    })
  })

  // --------------------------------------------------
  // AVATAR ET INITIALES
  // --------------------------------------------------
  describe('gestion de l\'avatar et des initiales', () => {
    it('calcule correctement les initiales "JD" pour "Jean Dupont"', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })
      // Template : <div v-else class="avatar-fallback">{{ initials }}</div>
      expect(wrapper.find('.avatar-fallback').text()).toBe('JD')
    })

    it('calcule les initiales pour un nom unique', () => {
      const wrapper = mount(RelationUserDetail, {
        props: { ...defaultProps, personne: { ...defaultPersonne, userName: 'Elon' } },
        global: mountOptions.global,
      })
      expect(wrapper.find('.avatar-fallback').text()).toBe('E')
    })

    it('affiche "?" si userName est vide', () => {
      const wrapper = mount(RelationUserDetail, {
        props: { ...defaultProps, personne: { ...defaultPersonne, userName: '' } },
        global: mountOptions.global,
      })
      expect(wrapper.find('.avatar-fallback').text()).toBe('?')
    })

    it('affiche l\'img avatar si personne.avatar est défini', () => {
      const wrapper = mount(RelationUserDetail, {
        props: { ...defaultProps, personne: { ...defaultPersonne, avatar: 'https://example.com/avatar.jpg' } },
        global: mountOptions.global,
      })
      expect(wrapper.find('.avatar-img').exists()).toBe(true)
      expect(wrapper.find('.avatar-fallback').exists()).toBe(false)
    })
  })

  // --------------------------------------------------
  // DONNÉES UTILISATEUR ET FORMATAGE
  // --------------------------------------------------
  describe('données utilisateur et rendu', () => {
    it('formate la date de naissance "YYYY-MM-DD" en "DD/MM/YYYY"', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })
      // bod: '2010-05-15' → '15/05/2010'
      expect(wrapper.text()).toContain('15/05/2010')
    })

    it('affiche les classes dans .pill-tag--class', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })
      // etabs[0].classes = ['6eA']
      expect(wrapper.find('.pill-tag--class').text()).toBe('6eA')
    })

    it('affiche les groupes dans .pill-tag--group via listGroupes', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })
      // etabs[0].listGroupes = ['Anglais']
      expect(wrapper.find('.pill-tag--group').text()).toBe('Anglais')
    })

    it('affiche le nom de l\'établissement', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })
      expect(wrapper.text()).toContain('Lycée Test')
    })

    it('affiche l\'email', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })
      expect(wrapper.text()).toContain('jean.dupont@test.fr')
    })

    it('affiche le nom dans .detail-name en majuscules (CSS text-transform, la valeur est bien présente)', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })
      expect(wrapper.find('.detail-name').text()).toBe('Jean Dupont')
    })

    it('émet l\'événement "close" lors du clic sur le bouton de fermeture', async () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })
      // Le bouton de fermeture est .btn-primary.small avec aria-label="close"
      await wrapper.find('.detail-header button').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
    })
  })

  // --------------------------------------------------
  // BADGE DE STATUT
  // --------------------------------------------------
  describe('badge de statut', () => {
    it('affiche le badge de statut avec la classe selon etat', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })
      // etat = 'Actif' → status-badge--actif
      expect(wrapper.find('.status-badge').exists()).toBe(true)
      expect(wrapper.find('.status-badge').text()).toBe('Actif')
    })

    it('affiche le badge "external-account" si mdp === false', () => {
      const wrapper = mount(RelationUserDetail, {
        props: { ...defaultProps, personne: { ...defaultPersonne, mdp: false } },
        global: mountOptions.global,
      })
      expect(wrapper.find('.status-badge--external').exists()).toBe(true)
    })

    it('ne montre pas le badge external si mdp !== false', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps, // mdp: true
        global: mountOptions.global,
      })
      expect(wrapper.find('.status-badge--external').exists()).toBe(false)
    })
  })

  // --------------------------------------------------
  // RELATIONS (parentEleve)
  // --------------------------------------------------
  describe('section personnes en relation', () => {
    it('affiche les parents dans .relation-card', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })
      expect(wrapper.find('.relation-card').exists()).toBe(true)
      expect(wrapper.find('.relation-card').text()).toContain('Marie Dupont')
    })

    it('affiche le lien de parenté', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })
      expect(wrapper.find('.relation-type').text()).toContain('Mère')
    })

    it('affiche .ap-tag si autoriteParental est true', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })
      expect(wrapper.find('.ap-tag').exists()).toBe(true)
    })
  })

  // --------------------------------------------------
  // BRANCHES LOGIQUES COMPUTED
  // --------------------------------------------------
  describe('logique métier (computed)', () => {
    it('ne plante pas et n\'affiche pas de pill-tag si les étabs sont vides', () => {
      const wrapper = mount(RelationUserDetail, {
        props: {
          ...defaultProps,
          personne: {
            ...defaultPersonne,
            fonctionClassesGroupe: {
              sectionClassesGroupes: {
                sectionEleve: { etabs: [{}] },
              },
            },
          },
        },
        global: mountOptions.global,
      })
      expect(wrapper.find('.pill-tag--class').exists()).toBe(false)
      expect(wrapper.find('.pill-tag--group').exists()).toBe(false)
    })

    it('gère les groupes via le champ "groupes" si listGroupes est absent', () => {
      const wrapper = mount(RelationUserDetail, {
        props: {
          ...defaultProps,
          personne: {
            ...defaultPersonne,
            fonctionClassesGroupe: {
              sectionClassesGroupes: {
                sectionEleve: {
                  etabs: [{ groupes: ['GroupeB'] }],
                },
              },
            },
          },
        },
        global: mountOptions.global,
      })
      expect(wrapper.find('.pill-tag--group').text()).toBe('GroupeB')
    })

    it('gère les groupes via le champ "groupe" (singulier) en dernier recours', () => {
      const wrapper = mount(RelationUserDetail, {
        props: {
          ...defaultProps,
          personne: {
            ...defaultPersonne,
            fonctionClassesGroupe: {
              sectionClassesGroupes: {
                sectionEleve: {
                  etabs: [{ groupe: 'GroupeSingulier' }],
                },
              },
            },
          },
        },
        global: mountOptions.global,
      })
      expect(wrapper.find('.pill-tag--group').text()).toBe('GroupeSingulier')
    })

    it('gère les classes via le champ "classe" (singulier) si classes est absent', () => {
      const wrapper = mount(RelationUserDetail, {
        props: {
          ...defaultProps,
          personne: {
            ...defaultPersonne,
            fonctionClassesGroupe: {
              sectionClassesGroupes: {
                sectionEleve: {
                  etabs: [{ classe: '5eB' }],
                },
              },
            },
          },
        },
        global: mountOptions.global,
      })
      expect(wrapper.find('.pill-tag--class').text()).toBe('5eB')
    })

    it('n\'affiche pas la section classes/groupes si tout est vide', () => {
      const wrapper = mount(RelationUserDetail, {
        props: {
          ...defaultProps,
          personne: {
            userName: 'Solo',
            fonctionClassesGroupe: {
              sectionClassesGroupes: {
                sectionEleve: { etabs: [] },
              },
            },
          },
        },
        global: mountOptions.global,
      })
      expect(wrapper.find('.sub-section').exists()).toBe(false)
    })
  })
})
