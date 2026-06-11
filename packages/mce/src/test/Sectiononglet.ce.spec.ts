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
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ChangeEmail from '@/components/ChangeEmail.ce.vue'
import FonctionsList from '@/components/FonctionsList.ce.vue'
import ChangePassword from '../components/ChangePassword.ce.vue'
import InformationPersonnelle from '../components/InformationPersonnelle.ce.vue'
import SectionOnglet from '../components/SectionOnglet.ce.vue'

// On mock tous les enfants lourds pour isoler la logique de SectionOnglet
vi.mock('@/components/ChangeEmail.ce.vue', () => ({
  default: { name: 'ChangeEmail', template: '<div class="mock-change-email" />', props: ['userInfoApiUrl', 'mceApi', 'userId', 'currentEmail'], emits: ['close', 'updated'] },
}))
vi.mock('@/components/FonctionsList.ce.vue', () => ({
  default: { name: 'FonctionsList', template: '<div class="mock-fonctions-list" />', props: ['fonctions', 'userInfoApiUrl', 'mceApi'] },
}))
vi.mock('./ChangePassword.ce.vue', () => ({
  default: { name: 'ChangePassword', template: '<div class="mock-change-password" />', props: ['userInfoApiUrl', 'userId', 'mceApi'] },
}))
vi.mock('./InformationPersonnelle.ce.vue', () => ({
  default: { name: 'InformationPersonnelle', template: '<div class="mock-info-perso" />', props: ['uid', 'nom', 'prenom', 'dateNaissance', 'userMail', 'userId', 'userInfoApiUrl', 'mceApi', 'canModifyEmail'], emits: ['emailUpdated', 'openChangeEmail'] },
}))

const defaultProps = {
  mceApi: 'https://api.test.fr',
  listMenu: 'GENERALE',
  userInfoApiUrl: 'https://api.test.fr/userinfo',
  fonctionClassesGroupe: { listFonctions: [] },
  parentEleve: {},
  relationEleve: {},
  apprentis: {},
  services: ['ENT Portail', 'Pronote'],
  etabCurrent: 'Lycée Jean Zay',
  userName: 'Dupont Jean',
  userMail: 'jean@test.fr',
  uid: 'recia-123',
  userId: 'recia-123',
  bod: '01/01/1990',
  nom: 'Dupont',
  prenom: 'Jean',
  canModifyEmail: false,
  showChangeEmail: false,
  mdp: false,
  listOnglets: ['GENERALE', 'CHANGE_PASSWORD'],
}

describe('sectionOnglet', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(SectionOnglet, {
      props: defaultProps,
      global: {
        // info-general et services-ent sont des web components globaux
        stubs: { InfoGeneral: true, ServicesEnt: true },
      },
    })
  })

  // --------------------------------------------------
  // STRUCTURE GÉNÉRALE
  // --------------------------------------------------
  describe('structure générale', () => {
    it('rend un .section-content-wrapper à la racine', () => {
      expect(wrapper.find('.section-content-wrapper').exists()).toBe(true)
    })

    it('rend les quatre panneaux tabpanel quand showChangeEmail est false', () => {
      expect(wrapper.find('#onglet-tabpanel-GENERALE').exists()).toBe(true)
      expect(wrapper.find('#onglet-tabpanel-SERVICE').exists()).toBe(true)
      expect(wrapper.find('#onglet-tabpanel-CHANGE_PASSWORD').exists()).toBe(true)
      expect(wrapper.find('#onglet-tabpanel-FONCTION_LIST').exists()).toBe(true)
    })

    it('chaque panneau a role="tabpanel"', () => {
      const panels = wrapper.findAll('[role="tabpanel"]')
      expect(panels).toHaveLength(4)
    })

    it('chaque panneau a tabindex="0"', () => {
      const panels = wrapper.findAll('[role="tabpanel"]')
      panels.forEach(p => expect(p.attributes('tabindex')).toBe('0'))
    })
  })

  // --------------------------------------------------
  // AFFICHAGE DE L'ONGLET ACTIF (v-show)
  // --------------------------------------------------
  describe('visibilité via v-show selon listMenu', () => {
    it('gENERALE est visible quand listMenu="GENERALE"', () => {
      // v-show ne supprime pas le DOM, on vérifie display:none via isVisible
      expect(wrapper.find('#onglet-tabpanel-GENERALE').isVisible()).toBe(true)
    })

    it('sERVICE est masqué quand listMenu="GENERALE"', () => {
      expect(wrapper.find('#onglet-tabpanel-SERVICE').isVisible()).toBe(false)
    })

    it('cHANGE_PASSWORD est masqué quand listMenu="GENERALE"', () => {
      expect(wrapper.find('#onglet-tabpanel-CHANGE_PASSWORD').isVisible()).toBe(false)
    })

    it('sERVICE est visible quand listMenu="SERVICE"', async () => {
      await wrapper.setProps({ listMenu: 'SERVICE' })
      expect(wrapper.find('#onglet-tabpanel-SERVICE').isVisible()).toBe(true)
      expect(wrapper.find('#onglet-tabpanel-GENERALE').isVisible()).toBe(false)
    })

    it('cHANGE_PASSWORD est visible quand listMenu="CHANGE_PASSWORD"', async () => {
      await wrapper.setProps({ listMenu: 'CHANGE_PASSWORD' })
      expect(wrapper.find('#onglet-tabpanel-CHANGE_PASSWORD').isVisible()).toBe(true)
    })

    it('fONCTION_LIST est visible quand listMenu="FONCTION_LIST"', async () => {
      await wrapper.setProps({ listMenu: 'FONCTION_LIST' })
      expect(wrapper.find('#onglet-tabpanel-FONCTION_LIST').isVisible()).toBe(true)
    })
  })

  // --------------------------------------------------
  // PANNEAU CHANGE EMAIL (showChangeEmail)
  // --------------------------------------------------
  describe('panneau ChangeEmail (showChangeEmail)', () => {
    it('n\'affiche pas ChangeEmail quand showChangeEmail est false', () => {
      expect(wrapper.findComponent(ChangeEmail).exists()).toBe(false)
    })

    it('affiche ChangeEmail et masque les tabpanels quand showChangeEmail est true', async () => {
      await wrapper.setProps({ showChangeEmail: true })
      expect(wrapper.findComponent(ChangeEmail).exists()).toBe(true)
      expect(wrapper.find('[role="tabpanel"]').exists()).toBe(false)
    })

    it('passe les bonnes props à ChangeEmail', async () => {
      await wrapper.setProps({ showChangeEmail: true })
      const ce = wrapper.findComponent(ChangeEmail)
      expect(ce.props('userInfoApiUrl')).toBe('https://api.test.fr/userinfo')
      expect(ce.props('mceApi')).toBe('https://api.test.fr')
      expect(ce.props('userId')).toBe('recia-123')
      expect(ce.props('currentEmail')).toBe('jean@test.fr')
    })

    it('émet "closeChangeEmail" quand ChangeEmail émet "close"', async () => {
      await wrapper.setProps({ showChangeEmail: true })
      await wrapper.findComponent(ChangeEmail).vm.$emit('close')
      expect(wrapper.emitted('closeChangeEmail')).toBeTruthy()
    })

    it('émet "emailUpdated" avec la valeur quand ChangeEmail émet "updated"', async () => {
      await wrapper.setProps({ showChangeEmail: true })
      await wrapper.findComponent(ChangeEmail).vm.$emit('updated', 'nouveau@test.fr')
      expect(wrapper.emitted('emailUpdated')?.[0]).toEqual(['nouveau@test.fr'])
    })
  })

  // --------------------------------------------------
  // ONGLET GENERALE — InformationPersonnelle
  // --------------------------------------------------
  describe('onglet GENERALE — InformationPersonnelle', () => {
    it('rend InformationPersonnelle dans le panneau GENERALE', () => {
      expect(wrapper.findComponent(InformationPersonnelle).exists()).toBe(true)
    })

    it('passe les bonnes props à InformationPersonnelle', () => {
      const ip = wrapper.findComponent(InformationPersonnelle)
      expect(ip.props('uid')).toBe('recia-123')
      expect(ip.props('nom')).toBe('Dupont')
      expect(ip.props('prenom')).toBe('Jean')
      expect(ip.props('userMail')).toBe('jean@test.fr')
      expect(ip.props('userId')).toBe('recia-123')
      expect(ip.props('mceApi')).toBe('https://api.test.fr')
      expect(ip.props('canModifyEmail')).toBe(false)
    })

    it('émet "openChangeEmail" quand InformationPersonnelle émet "openChangeEmail"', async () => {
      await wrapper.findComponent(InformationPersonnelle).vm.$emit('openChangeEmail')
      expect(wrapper.emitted('openChangeEmail')).toBeTruthy()
    })

    it('émet "emailUpdated" quand InformationPersonnelle émet "emailUpdated"', async () => {
      await wrapper.findComponent(InformationPersonnelle).vm.$emit('emailUpdated', 'updated@test.fr')
      expect(wrapper.emitted('emailUpdated')?.[0]).toEqual(['updated@test.fr'])
    })
  })

  // --------------------------------------------------
  // ONGLET CHANGE_PASSWORD — ChangePassword
  // --------------------------------------------------
  describe('onglet CHANGE_PASSWORD — ChangePassword', () => {
    it('rend ChangePassword dans le panneau CHANGE_PASSWORD', () => {
      expect(wrapper.findComponent(ChangePassword).exists()).toBe(true)
    })

    it('passe les bonnes props à ChangePassword', () => {
      const cp = wrapper.findComponent(ChangePassword)
      expect(cp.props('userInfoApiUrl')).toBe('https://api.test.fr/userinfo')
      expect(cp.props('userId')).toBe('recia-123')
      expect(cp.props('mceApi')).toBe('https://api.test.fr')
    })
  })

  // --------------------------------------------------
  // ONGLET FONCTION_LIST — FonctionsList
  // --------------------------------------------------
  describe('onglet FONCTION_LIST — FonctionsList', () => {
    const fonctions = [
      { idFonction: 1, fonction: 'Professeur', discipline: 'Maths', struct: { name: 'Lycée Test', type: 'LYC' }, active: true },
    ]

    it('rend FonctionsList dans le panneau FONCTION_LIST', () => {
      expect(wrapper.findComponent(FonctionsList).exists()).toBe(true)
    })

    it('passe les fonctions issues de fonctionClassesGroupe.listFonctions', async () => {
      await wrapper.setProps({ fonctionClassesGroupe: { listFonctions: fonctions as any } })
      const fl = wrapper.findComponent(FonctionsList)
      expect(fl.props('fonctions')).toEqual(fonctions)
    })

    it('passe un tableau vide si listFonctions est absent', () => {
      const fl = wrapper.findComponent(FonctionsList)
      expect(fl.props('fonctions')).toEqual([])
    })
  })

  // --------------------------------------------------
  // ARIA — cohérence aria-labelledby entre panneaux et onglets
  // --------------------------------------------------
  describe('cohérence aria-labelledby des panneaux', () => {
    const panels = [
      { id: 'onglet-tabpanel-GENERALE', labelledby: 'onglet-tab-GENERALE' },
      { id: 'onglet-tabpanel-SERVICE', labelledby: 'onglet-tab-SERVICE' },
      { id: 'onglet-tabpanel-CHANGE_PASSWORD', labelledby: 'onglet-tab-CHANGE_PASSWORD' },
      { id: 'onglet-tabpanel-FONCTION_LIST', labelledby: 'onglet-tab-FONCTION_LIST' },
    ]

    panels.forEach(({ id, labelledby }) => {
      it(`#${id} a aria-labelledby="${labelledby}"`, () => {
        expect(wrapper.find(`#${id}`).attributes('aria-labelledby')).toBe(labelledby)
      })
    })
  })
})
