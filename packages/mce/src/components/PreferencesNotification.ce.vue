<!--
 Copyright (C) 2023 GIP-RECIA, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<script setup lang="ts">
import type { Channel, NotificationCatalogItem, Priorities, ServicePref, UserPreferencesData } from '../types/notificationsType'
import { faDesktop, faEnvelope, faMobile } from '@fortawesome/free-solid-svg-icons'
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { I18nInjectionKey } from 'vue-i18n'
import { getAll } from '@/services/servicePortlet'
import { getPreferences, postPreferences } from '../services/serviceMce'

defineOptions({ name: 'PreferencesNotification' })

const props = defineProps<{
  apiPrefsUrl: string
  userInfoApiUrl: string
  portailApiUrl: string
}>()

const isMobile = ref(window.innerWidth <= 640)
const expandedStates = ref<string[]>([])
const preferences = ref<UserPreferencesData | null>(null)

const i18n = inject(I18nInjectionKey)

function t(key: string): string {
  return i18n ? (i18n.global.t as (k: string) => string)(`${key}`) : key
}

const notificationCatalog = ref<NotificationCatalogItem[]>([
  { service: 'PUBLISHER', priority: 'NORMAL', description: t('preferences-notifications.catalog.publisher-normal') },
  { service: 'PUBLISHER', priority: 'HIGH', description: t('preferences-notifications.catalog.publisher-high') },
  { service: 'NEXTCLOUD', priority: 'NORMAL', description: t('preferences-notifications.catalog.nextcloud-normal') },
  { service: 'GROUPER', priority: 'NORMAL', description: t('preferences-notifications.catalog.grouper-normal') },
  { service: 'MCE', priority: 'HIGH', description: t('preferences-notifications.catalog.mce-high') },
  { service: 'SARAPIS', priority: 'HIGH', description: t('preferences-notifications.catalog.sarapis-high') },
  { service: 'GRR', priority: 'LOW', description: t('preferences-notifications.catalog.grr-low') },
  { service: 'MCE', priority: 'LOW', description: t('preferences-notifications.catalog.mce-low') },
])

const criticalNotifs = computed(() => notificationCatalog.value.filter(n => n.priority === 'HIGH'))
const standardNotifs = computed(() => notificationCatalog.value.filter(n => n.priority === 'NORMAL'))
const minorNotifs = computed(() => notificationCatalog.value.filter(n => n.priority === 'LOW'))

function updateScreenSize() {
  isMobile.value = window.innerWidth <= 640
}

const alwaysOnServices: string[] = JSON.parse(import.meta.env.VITE_SERVICE_ALWAYS_ON_DISPLAY_LIST || '[]')

function toggleCard(serviceName: string): void {
  if (!isMobile.value)
    return

  if (expandedStates.value.includes(serviceName)) {
    expandedStates.value = expandedStates.value.filter(name => name !== serviceName)
  }
  else {
    expandedStates.value.push(serviceName)
  }
}

function getLevel(priorities: Priorities, channel: Channel): string {
  const high = priorities.HIGH[channel]
  const normal = priorities.NORMAL[channel]
  const low = priorities.LOW[channel]

  if (high && normal && low)
    return 'ALL'
  if (high && normal && !low)
    return 'STANDARD'
  if (high && !normal && !low)
    return 'CRITICAL'
  return 'NONE'
}

function setLevel(servicePref: ServicePref, channel: Channel, event: Event): void {
  const target = event.target as HTMLSelectElement
  const level = target.value
  const priorities = servicePref.priorities

  if (level === 'ALL') {
    priorities.HIGH[channel] = true
    priorities.NORMAL[channel] = true
    priorities.LOW[channel] = true
  }
  else if (level === 'STANDARD') {
    priorities.HIGH[channel] = true
    priorities.NORMAL[channel] = true
    priorities.LOW[channel] = false
  }
  else if (level === 'CRITICAL') {
    priorities.HIGH[channel] = true
    priorities.NORMAL[channel] = false
    priorities.LOW[channel] = false
  }
  else { // Aucune
    priorities.HIGH[channel] = false
    priorities.NORMAL[channel] = false
    priorities.LOW[channel] = false
  }

  servicePref.override = true
  servicePref.enabled = isServiceActive(servicePref.priorities)
}

function getGlobalChannelState(channel: Channel): 'ALL' | 'MIXED_OR_NONE' {
  if (!preferences.value || !preferences.value.services)
    return 'MIXED_OR_NONE'

  let allEnabled = true
  let hasAuthorized = false

  for (const servicePref of Object.values(preferences.value.services)) {
    if (servicePref._isAuthorized) {
      hasAuthorized = true
      const p = servicePref.priorities
      const isFullyEnabled = p.HIGH[channel] && p.NORMAL[channel] && p.LOW[channel]

      if (!isFullyEnabled) {
        allEnabled = false
        break
      }
    }
  }

  return (hasAuthorized && allEnabled) ? 'ALL' : 'MIXED_OR_NONE'
}

function toggleAll(channel: Channel): void {
  if (!preferences.value || !preferences.value.services)
    return

  const currentState = getGlobalChannelState(channel)
  const targetState = currentState !== 'ALL'

  for (const servicePref of Object.values(preferences.value.services)) {
    if (servicePref._isAuthorized) {
      servicePref.priorities.HIGH[channel] = targetState
      servicePref.priorities.NORMAL[channel] = targetState
      servicePref.priorities.LOW[channel] = targetState

      servicePref.override = true
      servicePref.enabled = isServiceActive(servicePref.priorities)
    }
  }
}

function isServiceActive(priorities: Priorities): boolean {
  const channels: Channel[] = ['ws', 'mail', 'push']
  const levels: (keyof Priorities)[] = ['HIGH', 'NORMAL', 'LOW']

  return channels.some(channel =>
    levels.some(level => priorities[level][channel]),
  )
}

async function savePreferences() {
  try {
    await postPreferences(`${props.apiPrefsUrl}/save`, preferences.value, props.userInfoApiUrl)
    console.warn('Préférences sauvegardées avec succès.')
  }
  catch (error) {
    console.error('Erreur lors de la sauvegarde des préférences.', error)
  }
}

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenSize)
})

onMounted(async () => {
  try {
    const [prefsReponse, portletData] = await Promise.all([
      getPreferences(props.apiPrefsUrl, {}, props.userInfoApiUrl),
      getAll(props.portailApiUrl),
    ])

    const loadedPreferences = (prefsReponse as any)?.data ?? prefsReponse

    const allowedPortlets = new Map<string, string>()
    if (portletData && portletData.portlets) {
      portletData.portlets.forEach((p) => {
        allowedPortlets.set(p.fname, p.name)
      })
    }

    if (loadedPreferences && loadedPreferences.services) {
      for (const [fname, servicePref] of Object.entries(loadedPreferences.services) as [string, ServicePref][]) {
        const isAuthorized = allowedPortlets.has(fname) || alwaysOnServices.includes(fname)
        servicePref._isAuthorized = isAuthorized

        if (isAuthorized) {
          servicePref._displayName = allowedPortlets.get(fname) || fname
        }
      }
    }

    preferences.value = loadedPreferences
  }
  catch (error) {
    console.error('Error fetching preferences or portlet data:', error)
  }
})
</script>

<template>
  <div
    v-if="preferences"
    class="preferences-container"
  >
    <form
      v-if="preferences"
      id="prefsForms"
      @submit.prevent="savePreferences"
    >
      <header class="form-header">
        <h2>{{ t('preferences-notifications.title') }}</h2>
      </header>

      <details class="info-disclosure">
        <summary class="info-summary">
          <span class="summary-text">{{ t('preferences-notifications.info-summary') }}</span>
        </summary>

        <div class="info-content">
          <div
            v-if="criticalNotifs.length > 0"
            class="priority-category"
          >
            <div class="category-header">
              <span class="tag crit">{{ t('preferences-notifications.tag.critique') }}</span>
            </div>
            <ul class="dynamic-notif-list">
              <li
                v-for="(notif, index) in criticalNotifs"
                :key="`crit-${index}`"
              >
                <strong>{{ notif.service }}</strong> : {{ notif.description }}
              </li>
            </ul>
          </div>

          <div
            v-if="standardNotifs.length > 0"
            class="priority-category"
          >
            <div class="category-header">
              <span class="tag std">{{ t('preferences-notifications.tag.standard') }}</span>
            </div>
            <ul class="dynamic-notif-list">
              <li
                v-for="(notif, index) in standardNotifs"
                :key="`std-${index}`"
              >
                <strong>{{ notif.service }}</strong> : {{ notif.description }}
              </li>
            </ul>
          </div>

          <div
            v-if="minorNotifs.length > 0"
            class="priority-category"
          >
            <div class="category-header">
              <span class="tag min">{{ t('preferences-notifications.tag.mineure') }}</span>
            </div>
            <ul class="dynamic-notif-list">
              <li
                v-for="(notif, index) in minorNotifs"
                :key="`min-${index}`"
              >
                <strong>{{ notif.service }}</strong> : {{ notif.description }}
              </li>
            </ul>
          </div>
        </div>
      </details>

      <div class="section-header">
        <h3 class="section-title">
          <i class="fa fa-bolt icon-section" /> {{ t('preferences-notifications.quick-actions.title') }}
        </h3>
      </div>

      <div class="quick-actions-buttons">
        <button
          type="button"
          class="btn-secondary small"
          :class="{ 'is-all-active': getGlobalChannelState('ws') === 'ALL' }"
          role="switch"
          :aria-checked="getGlobalChannelState('ws') === 'ALL'"
          @click="toggleAll('ws')"
        >
          <font-awesome-icon :icon="faDesktop" />
          <span class="btn-text">
            {{ getGlobalChannelState('ws') === 'ALL' ? t('preferences-notifications.quick-actions.ws-deactivate') : t('preferences-notifications.quick-actions.ws-activate') }}
          </span>
        </button>

        <button
          type="button"
          class="btn-secondary small"
          :class="{ 'is-all-active': getGlobalChannelState('mail') === 'ALL' }"
          role="switch"
          :aria-checked="getGlobalChannelState('mail') === 'ALL'"
          @click="toggleAll('mail')"
        >
          <font-awesome-icon :icon="faEnvelope" />
          <span class="btn-text">
            {{ getGlobalChannelState('mail') === 'ALL' ? t('preferences-notifications.quick-actions.mail-deactivate') : t('preferences-notifications.quick-actions.mail-activate') }}
          </span>
        </button>

        <button
          type="button"
          class="btn-secondary small"
          :class="{ 'is-all-active': getGlobalChannelState('push') === 'ALL' }"
          role="switch"
          :aria-checked="getGlobalChannelState('push') === 'ALL'"
          @click="toggleAll('push')"
        >
          <font-awesome-icon :icon="faMobile" />
          <span class="btn-text">
            {{ getGlobalChannelState('push') === 'ALL' ? t('preferences-notifications.quick-actions.push-deactivate') : t('preferences-notifications.quick-actions.push-activate') }}
          </span>
        </button>
      </div>

      <div class="section-header section-header--spaced">
        <h3 class="section-title">
          <i class="fa fa-sliders icon-section" /> {{ t('preferences-notifications.advanced.title') }}
        </h3>
      </div>

      <div class="cards-grid">
        <div
          v-for="(servicePref, serviceName) in preferences.services"
          v-show="servicePref._isAuthorized"
          :key="serviceName"
          class="service-card"
        >
          <div
            class="card-header"
            @click="toggleCard(serviceName as string)"
          >
            <h4>{{ servicePref._displayName }}</h4>

            <span
              class="badge"
              :class="isServiceActive(servicePref.priorities) ? 'badge-active' : 'badge-inactive'"
            >
              {{ isServiceActive(servicePref.priorities) ? t('preferences-notifications.badge.active') : t('preferences-notifications.badge.inactive') }}
            </span>
          </div>

          <div
            v-show="!isMobile || expandedStates.includes(serviceName as string)"
            class="card-body"
          >
            <div class="notif-row">
              <span class="notif-label">{{ t('preferences-notifications.channel.ws') }}</span>
              <select
                class="level-select"
                :value="getLevel(servicePref.priorities, 'ws')"
                @change="setLevel(servicePref, 'ws', $event)"
              >
                <option value="ALL">
                  {{ t('preferences-notifications.level.ALL') }}
                </option>
                <option value="STANDARD">
                  {{ t('preferences-notifications.level.STANDARD') }}
                </option>
                <option value="CRITICAL">
                  {{ t('preferences-notifications.level.CRITICAL') }}
                </option>
                <option value="NONE">
                  {{ t('preferences-notifications.level.NONE') }}
                </option>
              </select>
            </div>

            <div class="notif-row">
              <span class="notif-label">{{ t('preferences-notifications.channel.mail') }}</span>
              <select
                class="level-select"
                :value="getLevel(servicePref.priorities, 'mail')"
                @change="setLevel(servicePref, 'mail', $event)"
              >
                <option value="ALL">
                  {{ t('preferences-notifications.level.ALL') }}
                </option>
                <option value="STANDARD">
                  {{ t('preferences-notifications.level.STANDARD') }}
                </option>
                <option value="CRITICAL">
                  {{ t('preferences-notifications.level.CRITICAL') }}
                </option>
                <option value="NONE">
                  {{ t('preferences-notifications.level.NONE') }}
                </option>
              </select>
            </div>

            <div class="notif-row">
              <span class="notif-label">{{ t('preferences-notifications.channel.push') }}</span>
              <select
                class="level-select"
                :value="getLevel(servicePref.priorities, 'push')"
                @change="setLevel(servicePref, 'push', $event)"
              >
                <option value="ALL">
                  {{ t('preferences-notifications.level.ALL') }}
                </option>
                <option value="STANDARD">
                  {{ t('preferences-notifications.level.STANDARD') }}
                </option>
                <option value="CRITICAL">
                  {{ t('preferences-notifications.level.CRITICAL') }}
                </option>
                <option value="NONE">
                  {{ t('preferences-notifications.level.NONE') }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="form-footer">
        <button
          type="submit"
          class="btn-primary"
        >
          {{ t('preferences-notifications.submit') }}
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@use 'ress/dist/ress.min.css';
@use 'sass:map';
@use '@gip-recia/ui/core/variables' as *;
@use '@gip-recia/ui/functions' as *;
@use '@gip-recia/ui/mixins' as *;
@use '@gip-recia/ui/components/buttons';
@use '@gip-recia/ui/components/tags';
@use '../assets/mce-shared' as *;

.preferences-container {
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  box-sizing: border-box;
}

.form-header {
  margin-bottom: 1.25rem;
}

.info-disclosure {
  @include mce-card-base;
  margin-bottom: 1.5rem;
}

.info-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  &::marker {
    content: none;
  }

  &::after {
    content: '';
    width: 0.625rem;
    height: 0.625rem;
    border-right: 2px solid var(--#{$prefix}basic-black-lighter);
    border-bottom: 2px solid var(--#{$prefix}basic-black-lighter);
    transform: rotate(45deg);
    transition: transform 0.2s;
    flex-shrink: 0;
  }

  &:hover {
    background-color: var(--#{$prefix}hover);
  }
}

.info-disclosure[open] .info-summary::after {
  transform: rotate(225deg);
}

.summary-text {
  @include mce-info-label;
  font-size: var(--#{$prefix}font-size-md);
  color: var(--#{$prefix}basic-black);
}

.info-content {
  padding: 1.25rem;
}

.priority-category {
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.category-header {
  margin-bottom: 0.75rem;
}

.tag {
  &.crit {
    @include mce-soft-badge(system-red);
  }

  &.std {
    @include mce-soft-badge(system-blue);
  }

  &.min {
    @include mce-soft-badge(category-lightGreen);
  }
}

.dynamic-notif-list {
  margin: 0;
  padding: 0 0 0 0.75rem;
  list-style: none;
  border-left: 2px solid var(--#{$prefix}stroke);

  li {
    margin-bottom: 0.5rem;
    padding-left: 0.625rem;
    font-size: var(--#{$prefix}font-size-sm);
    line-height: 1.5;
    color: var(--#{$prefix}basic-black-lighter);

    strong {
      @include mce-info-value-bold;
      color: var(--#{$prefix}basic-black);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.section-header {
  margin-bottom: 1.25rem;
  padding-bottom: 0.625rem;
  border-bottom: 1px solid var(--#{$prefix}stroke);

  &--spaced {
    margin-top: 2.5rem;
  }
}

.section-title,
.form-header h2 {
  margin: 0;
  font-size: var(--#{$prefix}font-size-h2);
  font-weight: 700;
  color: var(--#{$prefix}basic-black);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.icon-section {
  font-size: var(--#{$prefix}font-size-md);
  color: var(--#{$prefix}basic-black-lighter);
}

.quick-actions-buttons {
  @include mce-badge-container;
  gap: 0.75rem;

  .btn-secondary.is-all-active {
    background-color: var(--#{$prefix}primary);
    color: var(--#{$prefix}body-inverted);
    border-color: var(--#{$prefix}primary);

    &:hover,
    &:focus-visible {
      background-color: var(--#{$prefix}btn-primary-pressed);
    }
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  width: 100%;
  align-items: start;

  @media (width < map.get($grid-breakpoints, xxl)) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (width < map.get($grid-breakpoints, sm)) {
    grid-template-columns: 1fr;
  }
}

.service-card {
  @include mce-card-base;
  min-width: 0;

  &:hover {
    box-shadow: var(--#{$prefix}shadow-low-elevation) rgba(0, 0, 0, 0.08);
  }
}

.card-header {
  @include mce-card-header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;

  h4 {
    margin: 0;
    font-size: var(--#{$prefix}font-size-h4);
    font-weight: 700;
  }
}

.card-body {
  @include mce-card-body;
}

.badge {
  @include mce-badge-base;
  border-radius: 12px;

  &-active {
    @include mce-soft-badge(category-lightGreen);
  }

  &-inactive {
    @include mce-soft-badge(system-red);
  }
}

.notif-row {
  display: grid;
  grid-template-columns: 160px 1fr;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px dashed var(--#{$prefix}stroke);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.notif-label {
  @include mce-info-label;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.level-select {
  width: 100%;
  max-width: 280px;
  padding: 0.5rem 0.625rem;
  border: 1px solid var(--#{$prefix}stroke);
  border-radius: 6px;
  background-color: var(--#{$prefix}body-bg);
  font-size: var(--#{$prefix}font-size-sm);
  color: var(--#{$prefix}basic-black);
  cursor: pointer;
  text-overflow: ellipsis;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--#{$prefix}primary);
    outline: none;
  }
}

.form-footer {
  @include mce-action-row;
}
</style>
