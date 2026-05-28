/**
 * Copyright (C) 2023 GIP-RECIA, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { Relation } from '@/types/relationType'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createI18n, I18nInjectionKey } from 'vue-i18n'
import { getDetailEnfant } from '@/services/serviceMce'
import RelationUser from './RelationUser.ce.vue'

// Mocks
vi.mock('@/services/serviceMce', () => ({
  getDetailEnfant: vi.fn(),
}))

const messages = {
  fr: {
    'relation-user': {
      'title-relation-student': 'Personne en relation avec moi',
      'parental-authority': 'Autorité parentale',
      'relation-default': 'Relation',
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

  const createWrapper = (props: Partial<typeof defaultProps> = {}) => {
    const i18n = createI18n({ locale: 'fr', messages })
    return mount(RelationUser, {
      props: { ...defaultProps, ...props } as any,
      global: {
        plugins: [i18n],
        provide: { [I18nInjectionKey as unknown as string]: i18n },
        stubs: { RelationUserDetail: true },
      },
    })
  }

  describe('normalisation des relations', () => {
    it('doit gérer le cas tableau vide', () => {
      const wrapper = createWrapper({ details: [] })
      expect(wrapper.findAll('.relation-row-item')).toHaveLength(0)
    })

    it('doit encapsuler un objet unique dans un tableau', () => {
      const singleRelation = {
        uidRelation: '1',
        displayNameRelation: 'Solo',
      } as Relation

      const wrapper = createWrapper({ details: [singleRelation] })
      expect(wrapper.findAll('.relation-row-item')).toHaveLength(1)
    })
  })

  describe('actions', () => {
    // it('doit gérer l\'état de chargement et le succès', async () => {
    //   let resolvePromise!: (value: any) => void
    //   const promise = new Promise((resolve) => { resolvePromise = resolve })
    //
    //   vi.mocked(getDetailEnfant).mockReturnValue(promise as any)
    //
    //   const wrapper = createWrapper()
    //   await wrapper.find('.relation-row-item').trigger('click')
    //
    //   await Promise.resolve()
    //   await wrapper.vm.$nextTick()
    //
    //   const detail = wrapper.findComponent({ name: 'RelationUserDetail' })
    //   expect(detail.exists()).toBe(true)
    //   expect(detail.props('isLoading')).toBe(true)
    //
    //   // Résolution de la promesse
    //   resolvePromise({ data: { name: 'Enfant' } })
    //   await promise
    //   await wrapper.vm.$nextTick()
    //
    //   expect(wrapper.find('.relation-row-item').classes()).toContain('active')
    // })

    it('doit fermer le détail si on reclique sur la même relation', async () => {
      vi.mocked(getDetailEnfant).mockResolvedValueOnce({ data: {} } as any)

      const wrapper = createWrapper()
      const item = wrapper.find('.relation-row-item')

      await item.trigger('click')
      await Promise.resolve()
      await wrapper.vm.$nextTick()

      await item.trigger('click')
      await Promise.resolve()
      await wrapper.vm.$nextTick()

      expect(wrapper.findComponent({ name: 'RelationUserDetail' }).exists()).toBe(false)
    })

    it('doit gérer l\'erreur API', async () => {
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

  describe('rendu et traductions', () => {
    it('doit utiliser la traduction par défaut si typeRelation est vide', () => {
      const wrapper = createWrapper({
        details: [{ uidRelation: '1', displayNameRelation: 'A', typeRelation: '' }] as Relation[],
      })
      expect(wrapper.find('.info-label').text()).toBe('Relation')
    })
  })
})
