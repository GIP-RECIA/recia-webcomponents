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
import RelationUserDetail from '../components/RelationUserDetail.ce.vue'

const mockI18n = {
  global: {
    t: (key: string, params?: Record<string, unknown>) => {
      const translations: Record<string, string> = {
        'relation-user-detail.loading': 'Chargement',
        'relation-user-detail.error': 'Erreur',
        'relation-user-detail.close': 'Fermer',
        'relation-user-detail.external-account': 'Compte externe',
        'relation-user-detail.lien': 'Lien',
        'relation-user-detail.lien-label': `Lien : ${params?.lien ?? ''}`,
        'relation-user-detail.autorite-parentale': 'Autorité parentale',
      }

      return translations[key] ?? key.replace('relation-user-detail.', '')
    },
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
    {
      displayNameRelation: 'Marie Dupont',
      lienParente: 'Mère',
      autoriteParental: true,
    },
  ],
}

const defaultProps = {
  personne: defaultPersonne,
  isLoading: false,
  hasError: false,
}

describe('relationUserDetail', () => {
  describe('états de chargement et erreurs', () => {
    it('affiche le bloc de chargement si isLoading est true', () => {
      const wrapper = mount(RelationUserDetail, {
        props: { ...defaultProps, isLoading: true },
        global: mountOptions.global,
      })

      expect(wrapper.find('.alert-message--info').exists()).toBe(true)
      expect(wrapper.text()).toContain('Chargement')
    })

    it('n affiche pas le contenu pendant le chargement', () => {
      const wrapper = mount(RelationUserDetail, {
        props: { ...defaultProps, isLoading: true },
        global: mountOptions.global,
      })

      expect(wrapper.find('.detail-header').exists()).toBe(false)
    })

    it('affiche le bloc erreur si errorMessage est défini', () => {
      const wrapper = mount(RelationUserDetail, {
        props: { ...defaultProps, errorMessage: 'Erreur de connexion réseau' },
        global: mountOptions.global,
      })

      expect(wrapper.find('.alert-message--error').exists()).toBe(true)
      expect(wrapper.text()).toContain('Erreur de connexion réseau')
    })

    it('n affiche pas le contenu si errorMessage est défini', () => {
      const wrapper = mount(RelationUserDetail, {
        props: { ...defaultProps, errorMessage: 'Erreur de connexion réseau' },
        global: mountOptions.global,
      })

      expect(wrapper.find('.detail-header').exists()).toBe(false)
    })
  })

  describe('rendu des informations utilisateur', () => {
    it('affiche le nom', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.find('.detail-name').text()).toBe('Jean Dupont')
    })

    it('affiche le nom de l établissement', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.text()).toContain('Lycée Test')
    })

    it('affiche l uid', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.text()).toContain('12345')
    })

    it('formate la date de naissance', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.find('time').text()).toBe('15/05/2010')
      expect(wrapper.find('time').attributes('datetime')).toBe('2010-05-15')
    })
  })

  describe('badge de statut', () => {
    it('affiche le statut utilisateur', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.find('.status-badge').exists()).toBe(true)
      expect(wrapper.find('.status-badge').text()).toBe('Actif')
    })

    it('affiche le badge compte externe lorsque mdp vaut false', () => {
      const wrapper = mount(RelationUserDetail, {
        props: {
          ...defaultProps,
          personne: {
            ...defaultPersonne,
            mdp: false,
          },
        },
        global: mountOptions.global,
      })

      expect(wrapper.find('.status-badge--external').exists()).toBe(true)
      expect(wrapper.find('.status-badge--external').text())
        .toBe('Compte externe')
    })

    it('ne montre pas le badge externe lorsque mdp vaut true', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.find('.status-badge--external').exists()).toBe(false)
    })
  })

  describe('classes et groupes', () => {
    it('affiche les classes', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.findAll('.badge-tag')[0].text()).toBe('6eA')
    })

    it('affiche les groupes via listGroupes', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.findAll('.badge-tag')[1].text()).toBe('Anglais')
    })

    it('utilise groupes si listGroupes est absent', () => {
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

      expect(wrapper.find('.badge-tag').text()).toBe('GroupeB')
    })

    it('utilise groupe en dernier recours', () => {
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

      expect(wrapper.find('.badge-tag').text())
        .toBe('GroupeSingulier')
    })

    it('utilise classe si classes est absent', () => {
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

      expect(wrapper.find('.badge-tag').text())
        .toBe('5eB')
    })

    it('supprime les doublons', () => {
      const wrapper = mount(RelationUserDetail, {
        props: {
          ...defaultProps,
          personne: {
            ...defaultPersonne,
            fonctionClassesGroupe: {
              sectionClassesGroupes: {
                sectionEleve: {
                  etabs: [
                    {
                      classes: ['6A', '6A'],
                      listGroupes: ['Anglais', 'Anglais'],
                    },
                  ],
                },
              },
            },
          },
        },
        global: mountOptions.global,
      })

      expect(wrapper.findAll('.badge-tag')).toHaveLength(2)
    })
  })

  describe('enseignements', () => {
    it('affiche les enseignements suivis', () => {
      const wrapper = mount(RelationUserDetail, {
        props: {
          ...defaultProps,
          personne: {
            ...defaultPersonne,
            fonctionClassesGroupe: {
              sectionClassesGroupes: {
                sectionEleve: {
                  enseignementSuivis: ['Mathématiques', 'Physique'],
                },
              },
            },
          },
        },
        global: mountOptions.global,
      })

      const disciplines = wrapper.findAll('.badge-tag')

      expect(disciplines).toHaveLength(2)
      expect(disciplines[0].text()).toBe('Mathématiques')
      expect(disciplines[1].text()).toBe('Physique')
    })
  })

  describe('relations', () => {
    it('affiche les personnes en relation', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.find('.relation-card').exists()).toBe(true)
      expect(wrapper.text()).toContain('Marie Dupont')
    })

    it('affiche le lien de parenté', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.find('.relation-type').text())
        .toContain('Mère')
    })

    it('affiche le tag autorité parentale', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.find('.ap-tag').exists()).toBe(true)
      expect(wrapper.find('.ap-tag').text())
        .toBe('Autorité parentale')
    })
  })

  describe('événements', () => {
    it('émet close lors du clic sur le bouton fermer', async () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      await wrapper.find('button').trigger('click')

      expect(wrapper.emitted('close')).toEqual([[]])
    })
  })

  describe('cas limites', () => {
    it('n affiche aucun contenu lorsque personne est null', () => {
      const wrapper = mount(RelationUserDetail, {
        props: {
          personne: null,
          isLoading: false,
          errorMessage: undefined,
        },
        global: mountOptions.global,
      })

      expect(wrapper.find('.detail-header').exists()).toBe(false)
      expect(wrapper.find('.detail-grid').exists()).toBe(false)
    })
  })
})
