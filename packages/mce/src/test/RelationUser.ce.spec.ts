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

import type { Relation } from '@/types/relationType.ts'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createI18n, I18nInjectionKey } from 'vue-i18n'
import { getDetailEnfant } from '@/services/serviceMce.ts'
import RelationUser from '../components/RelationUser.ce.vue'

vi.mock('@/services/serviceMce', () => ({
  getDetailEnfant: vi.fn(),
}))

const messages = {
  fr: {
    'relation-user': {
      'title-relation-student': 'Personne en relation avec moi',
      'title-relation-master': 'Maîtres d\'apprentissage',
      'parental-authority': 'Autorité parentale',
      'relation-default': 'Relation',
      'no-relation': 'Aucune relation trouvée.',
    },
  },
}

describe('relationUser', () => {
  let defaultProps: {
    mceApi: string
    userInfoApiUrl: string
    details: Relation[]
    titre: string
    onglet: string
  }

  beforeEach(() => {
    vi.clearAllMocks()
    defaultProps = {
      mceApi: 'https://api.mce.local/',
      userInfoApiUrl: 'https://api.user.local',
      details: [{
        uidRelation: 'child-123',
        displayNameRelation: 'Jean Dupont',
        typeRelation: 'Père',
        autoriteParental: true,
      } as Relation],
      titre: 'student',
      onglet: 'GENERALE',
    }
  })

  function createWrapper(props: Partial<typeof defaultProps> = {}) {
    const i18n = createI18n({ locale: 'fr', messages })
    return mount(RelationUser, {
      props: { ...defaultProps, ...props } as any,
      global: {
        plugins: [i18n],
        provide: { [I18nInjectionKey as symbol]: { global: i18n.global } },
        stubs: { RelationUserDetail: true },
      },
    })
  }

  // --------------------------------------------------
  // RENDU INITIAL
  // --------------------------------------------------
  describe('rendu initial', () => {
    it('affiche le titre dans un h3 traduit selon la prop titre', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('h3').text()).toBe('Personne en relation avec moi')
    })

    it('affiche autant de .relation-row-item que d\'entrées dans details', () => {
      const wrapper = createWrapper()
      expect(wrapper.findAll('.relation-row-item')).toHaveLength(1)
    })

    it('affiche le displayName et le typeRelation', () => {
      const wrapper = createWrapper()
      const row = wrapper.find('.relation-row-item')
      expect(row.find('.info-value--bold').text()).toBe('Jean Dupont')
      expect(row.find('.info-label').text()).toBe('Père')
    })

    it('affiche le tag .ap-tag si autoriteParental est true', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.ap-tag').exists()).toBe(true)
      expect(wrapper.find('.ap-tag').text()).toBe('Autorité parentale')
    })

    it('n\'affiche pas .ap-tag si autoriteParental est false', () => {
      const wrapper = createWrapper({
        details: [{ uidRelation: '1', displayNameRelation: 'A', typeRelation: 'Tuteur', autoriteParental: false }] as Relation[],
      })
      expect(wrapper.find('.ap-tag').exists()).toBe(false)
    })
  })

  // --------------------------------------------------
  // CAS VIDE
  // --------------------------------------------------
  describe('liste vide', () => {
    it('n\'affiche aucun .relation-row-item si details est vide', () => {
      const wrapper = createWrapper({ details: [] })
      expect(wrapper.findAll('.relation-row-item')).toHaveLength(0)
    })
  })

  // --------------------------------------------------
  // TRADUCTION PAR DÉFAUT
  // --------------------------------------------------
  describe('traduction typeRelation', () => {
    it('utilise la traduction "relation-default" si typeRelation est vide', () => {
      const wrapper = createWrapper({
        details: [{ uidRelation: '1', displayNameRelation: 'A', typeRelation: '' }] as Relation[],
      })
      expect(wrapper.find('.info-label').text()).toBe('Relation')
    })
  })

  // --------------------------------------------------
  // ACTIONS – SÉLECTION
  // --------------------------------------------------
  describe('sélection d\'une relation', () => {
    it('affiche RelationUserDetail après le clic et réussit à charger', async () => {
      vi.mocked(getDetailEnfant).mockResolvedValueOnce({ data: { userName: 'Enfant' } } as any)

      const wrapper = createWrapper()
      await wrapper.find('.relation-row-item').trigger('click')
      await Promise.resolve()
      await wrapper.vm.$nextTick()

      const detail = wrapper.findComponent({ name: 'RelationUserDetail' })
      expect(detail.exists()).toBe(true)
    })

    it('applique .relation-row-item--active après sélection', async () => {
      vi.mocked(getDetailEnfant).mockResolvedValueOnce({ data: {} } as any)

      const wrapper = createWrapper()
      await wrapper.find('.relation-row-item').trigger('click')
      await Promise.resolve()
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.relation-row-item').classes()).toContain('relation-row-item--active')
    })

    it('applique .chevron--open au chevron après sélection', async () => {
      vi.mocked(getDetailEnfant).mockResolvedValueOnce({ data: {} } as any)

      const wrapper = createWrapper()
      await wrapper.find('.relation-row-item').trigger('click')
      await Promise.resolve()
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.chevron').classes()).toContain('chevron--open')
    })

    it('ferme le détail si on reclique sur la même relation', async () => {
      vi.mocked(getDetailEnfant).mockResolvedValueOnce({ data: {} } as any)

      const wrapper = createWrapper()
      const item = wrapper.find('.relation-row-item')

      await item.trigger('click')
      await Promise.resolve()
      await wrapper.vm.$nextTick()

      await item.trigger('click')
      await Promise.resolve()
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.relation-detail-panel').isVisible()).toBe(false)
    })
  })

  // --------------------------------------------------
  // ACTIONS – ERREUR API
  // --------------------------------------------------
  describe('erreur API', () => {
    it('affiche RelationUserDetail avec hasError=true si l\'API échoue', async () => {
      vi.mocked(getDetailEnfant).mockRejectedValueOnce(new Error('Erreur'))
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const wrapper = createWrapper()
      await wrapper.find('.relation-row-item').trigger('click')
      await Promise.resolve()
      await wrapper.vm.$nextTick()

      const detail = wrapper.findComponent({ name: 'RelationUserDetail' })
      expect(detail.exists()).toBe(true)
      expect(detail.props('hasError')).toBe(true)

      consoleSpy.mockRestore()
    })
  })

  // --------------------------------------------------
  // FERMETURE VIA ÉVÉNEMENT
  // --------------------------------------------------
  describe('fermeture via événement close', () => {
    it('ferme le détail quand RelationUserDetail émet "close"', async () => {
      vi.mocked(getDetailEnfant).mockResolvedValueOnce({ data: {} } as any)

      const wrapper = createWrapper()
      await wrapper.find('.relation-row-item').trigger('click')
      await Promise.resolve()
      await wrapper.vm.$nextTick()

      await wrapper.findComponent({ name: 'RelationUserDetail' }).vm.$emit('close')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.relation-detail-panel').isVisible()).toBe(false)
    })
  })
})
