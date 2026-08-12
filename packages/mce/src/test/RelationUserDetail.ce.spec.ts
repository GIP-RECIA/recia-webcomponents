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
    stubs: {
      'font-awesome-icon': true,
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
    let wrapper: ReturnType<typeof mount>

    beforeEach(() => {
      wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })
    })

    it('affiche le nom de la personne', () => {
      expect(wrapper.find('.detail-name').text()).toBe('Jean Dupont')
    })

    it('affiche l\'etat traduit', () => {
      expect(wrapper.text()).toContain('Actif')
    })

    it('affiche l\'etab', () => {
      expect(wrapper.text()).toContain('Lycée Test')
    })

    it('affiche la date de naissance formatée', () => {
      expect(wrapper.find('time').text()).toBe('15/05/2010')
      expect(wrapper.find('time').attributes('datetime')).toBe('2010-05-15')
    })
  })

  describe('badge de statut', () => {
    it('affiche le badge état traduit', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.find('.status-badge').exists()).toBe(true)
      expect(wrapper.find('.status-badge').text()).toContain('Actif')
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

      expect(wrapper.findAll('.tag-primary').some(t => t.text().includes('Compte externe'))).toBe(true)
    })

    it('n\'affiche pas le badge compte externe lorsque mdp vaut true', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.findAll('.tag-primary').some(t => t.text().includes('Compte externe'))).toBe(false)
    })
  })

  describe('classes et groupes', () => {
    it('affiche les classes', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.findAll('.tag.tag-primary')[0].text()).toBe('6eA')
    })

    it('affiche les groupes via listGroupes', () => {
      const wrapper = mount(RelationUserDetail, {
        props: defaultProps,
        global: mountOptions.global,
      })

      expect(wrapper.findAll('.tag.tag-primary')[1].text()).toBe('Anglais')
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

      expect(wrapper.find('.tag.tag-primary').text()).toBe('GroupeB')
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

      expect(wrapper.find('.tag.tag-primary').text())
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

      expect(wrapper.find('.tag.tag-primary').text())
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

      expect(wrapper.findAll('.tag.tag-primary')).toHaveLength(2)
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

      const disciplines = wrapper.findAll('.tag.tag-primary')

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
      expect(wrapper.find('.ap-tag').text()).toBe('Autorité parentale')
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
