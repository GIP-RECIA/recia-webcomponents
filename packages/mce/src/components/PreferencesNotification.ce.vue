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
import { ref, onMounted, computed, onBeforeUnmount, inject } from 'vue'
import { getPreferences, postPreferences } from '../services/serviceMce'
import { getAll } from '@/services/servicePortlet'
import { faDesktop, faEnvelope, faMailBulk, faMobile } from '@fortawesome/free-solid-svg-icons';
import { I18nInjectionKey, useI18n } from 'vue-i18n';
import type { Channel, Priorities, ServicePref, UserPreferencesData, NotificationCatalogItem} from '../types/notificationsType'

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

]);

const criticalNotifs = computed(() => notificationCatalog.value.filter(n => n.priority === 'HIGH'));
const standardNotifs = computed(() => notificationCatalog.value.filter(n => n.priority === 'NORMAL'));
const minorNotifs = computed(() => notificationCatalog.value.filter(n => n.priority === 'LOW'));

const upadateScreenSize = () => {
  isMobile.value = window.innerWidth <= 640
}

const alwaysOnServices: string[] = JSON.parse(import.meta.env.VITE_SERVICE_ALWAYS_ON_DISPLAY_LIST || '[]');


function toggleCard(serviceName: string): void {
  if (!isMobile.value) return;
  
  if (expandedStates.value.includes(serviceName)) {
    expandedStates.value = expandedStates.value.filter(name => name !== serviceName)
  } else {
    expandedStates.value.push(serviceName)
  }
}

function getLevel(priorities: Priorities, channel: Channel): string {
  const high = priorities.HIGH[channel];
  const normal = priorities.NORMAL[channel];
  const low = priorities.LOW[channel];

  if (high && normal && low) return 'ALL';
  if (high && normal && !low) return 'STANDARD';
  if (high && !normal && !low) return 'CRITICAL';
  return 'NONE';
}

function setLevel(servicePref: ServicePref, channel: Channel, event: Event): void {
  const target = event.target as HTMLSelectElement;
  const level = target.value;
  const priorities = servicePref.priorities;

  if (level === 'ALL') {
    priorities.HIGH[channel] = true;
    priorities.NORMAL[channel] = true;
    priorities.LOW[channel] = true;
  } else if (level === 'STANDARD') {
    priorities.HIGH[channel] = true;
    priorities.NORMAL[channel] = true;
    priorities.LOW[channel] = false;
  } else if (level === 'CRITICAL') {
    priorities.HIGH[channel] = true;
    priorities.NORMAL[channel] = false;
    priorities.LOW[channel] = false;
  } else { // Aucune
    priorities.HIGH[channel] = false;
    priorities.NORMAL[channel] = false;
    priorities.LOW[channel] = false;
  }
  
  servicePref.override = true; 
  servicePref.enabled = isServiceActive(servicePref.priorities);
}

function getGlobalChannelState(channel: Channel): 'ALL' | 'MIXED_OR_NONE' {
  if (!preferences.value || !preferences.value.services) return 'MIXED_OR_NONE';

  let allEnabled = true;
  let hasAuthorized = false;

  for (const servicePref of Object.values(preferences.value.services)) {
    if (servicePref._isAuthorized) {
      hasAuthorized = true;
      const p = servicePref.priorities;
      const isFullyEnabled = p.HIGH[channel] && p.NORMAL[channel] && p.LOW[channel];
      
      if (!isFullyEnabled) {
        allEnabled = false;
        break; 
      }
    }
  }

  return (hasAuthorized && allEnabled) ? 'ALL' : 'MIXED_OR_NONE';
}

function toggleAll(channel: Channel): void {
  if (!preferences.value || !preferences.value.services) return;

  const currentState = getGlobalChannelState(channel);
  const targetState = (currentState === 'ALL') ? false : true; 

  for (const servicePref of Object.values(preferences.value.services)) {
    if (servicePref._isAuthorized) {
      servicePref.priorities.HIGH[channel] = targetState;
      servicePref.priorities.NORMAL[channel] = targetState;
      servicePref.priorities.LOW[channel] = targetState;
      
      servicePref.override = true; 
      servicePref.enabled = isServiceActive(servicePref.priorities);
    }
  }
}

function isServiceActive(priorities: Priorities): boolean {
  const channels: Channel[] = ['ws', 'mail', 'push'];
  const levels: (keyof Priorities)[] = ['HIGH', 'NORMAL', 'LOW'];
  
  return channels.some(channel => 
    levels.some(level => priorities[level][channel])
  );
}

async function savePreferences() {
  try {
    await postPreferences(`${props.apiPrefsUrl}/save`, preferences.value, props.userInfoApiUrl)
    console.log('Préférences sauvegardées avec succès.')
  } catch (_error) {
    console.error('Erreur lors de la sauvegarde des préférences.')
  }
}

onMounted(() => {
  window.addEventListener('resize', upadateScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', upadateScreenSize)
})


onMounted(async () => {
  try {
    const [prefsReponse, portletData] = await Promise.all([
      getPreferences(props.apiPrefsUrl, {}, props.userInfoApiUrl),
      getAll(props.portailApiUrl)
    ])

    const loadedPreferences = (prefsReponse as any)?.data ?? prefsReponse

    const allowedPortlets = new Map<string, string>()
    if (portletData && portletData.portlets) {
      portletData.portlets.forEach(p => {
        allowedPortlets.set(p.fname, p.name)
      })
    }

    if (loadedPreferences && loadedPreferences.services) {
      for (const [fname, servicePref] of Object.entries(loadedPreferences.services) as [string, ServicePref][])  {
        const isAuthorized = allowedPortlets.has(fname) || alwaysOnServices.includes(fname);
        servicePref._isAuthorized = isAuthorized;

        if( isAuthorized ) {
          servicePref._displayName = allowedPortlets.get(fname) || fname;
        }
      }
    }

    preferences.value = loadedPreferences;

  } catch (error) {
    console.error('Error fetching preferences or portlet data:', error)
  }
})



</script>

<template>
  <div v-if="preferences" class="preferences-container">
    <form id="prefsForms" v-if="preferences" @submit.prevent="savePreferences">
      
      <header class="form-header">
        <h2>{{ t('preferences-notifications.title') }}</h2>
      </header>

      <details class="info-disclosure">
  <summary class="info-summary">
    <span class="summary-text">{{ t('preferences-notifications.info-summary') }}</span>
  </summary>
  
  <div class="info-content">
    
    <div class="priority-category" v-if="criticalNotifs.length > 0">
      <div class="category-header">
        <span class="tag crit">{{ t('preferences-notifications.tag.critique') }}</span>
      </div>
      <ul class="dynamic-notif-list">
        <li v-for="(notif, index) in criticalNotifs" :key="'crit-'+index">
          <strong>{{ notif.service }}</strong> : {{ notif.description }}
        </li>
      </ul>
    </div>

    <div class="priority-category" v-if="standardNotifs.length > 0">
      <div class="category-header">
        <span class="tag std">{{ t('preferences-notifications.tag.standard') }}</span>
      </div>
      <ul class="dynamic-notif-list">
        <li v-for="(notif, index) in standardNotifs" :key="'std-'+index">
          <strong>{{ notif.service }}</strong> : {{ notif.description }}
        </li>
      </ul>
    </div>

    <div class="priority-category" v-if="minorNotifs.length > 0">
      <div class="category-header">
        <span class="tag min">{{ t('preferences-notifications.tag.mineure') }}</span>
      </div>
      <ul class="dynamic-notif-list">
        <li v-for="(notif, index) in minorNotifs" :key="'min-'+index">
          <strong>{{ notif.service }}</strong> : {{ notif.description }}
        </li>
      </ul>
    </div>

  </div>
</details>

<div class="section-header">
  <h3 class="section-title">
    <i class="fa fa-bolt icon-section"></i> {{ t('preferences-notifications.quick-actions.title') }}
  </h3>
</div>

<div class="quick-actions-buttons">
  <button 
    type="button" 
    class="btn-secondary small" 
    :class="{ 'is-all-active': getGlobalChannelState('ws') === 'ALL' }"
    role="switch"
    :aria-checked="getGlobalChannelState('ws') === 'ALL'"
    @click="toggleAll('ws')">
    <font-awesome-icon :icon="faDesktop"/>
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
    @click="toggleAll('mail')">
    <font-awesome-icon :icon="faEnvelope"/>
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
    @click="toggleAll('push')">
    <font-awesome-icon :icon="faMobile"/>
    <span class="btn-text">
      {{ getGlobalChannelState('push') === 'ALL' ? t('preferences-notifications.quick-actions.push-deactivate') : t('preferences-notifications.quick-actions.push-activate') }}
    </span>
  </button>
</div>

<div class="section-header" style="margin-top: 40px;">
  <h3  class="section-title">
    <i class="fa fa-sliders icon-section"></i> {{ t('preferences-notifications.advanced.title') }}
  </h3>
</div>

<div class="cards-grid">
  
  <div v-for="(servicePref, serviceName) in preferences.services" :key="serviceName" class="service-card" v-show="servicePref._isAuthorized">
  
    <div 
    class="card-header" 
    @click="toggleCard(serviceName as string)"
    >
      <h4>{{ servicePref._displayName }}</h4>
      
      <span 
        class="badge" 
        :class="isServiceActive(servicePref.priorities) ? 'badge-active' : 'badge-inactive'">
        {{ isServiceActive(servicePref.priorities) ? t('preferences-notifications.badge.active') : t('preferences-notifications.badge.inactive') }}
      </span>
    </div>

    <div v-show="!isMobile || expandedStates.includes(serviceName as string)" class="card-body">
      
      <div class="notif-row">
        <span class="notif-label">{{ t('preferences-notifications.channel.ws') }}</span>
        <select 
          class="level-select" 
          :value="getLevel(servicePref.priorities, 'ws')" 
          @change="setLevel(servicePref, 'ws', $event)">
          <option value="ALL">{{ t('preferences-notifications.level.ALL') }}</option>
          <option value="STANDARD">{{ t('preferences-notifications.level.STANDARD') }}</option>
          <option value="CRITICAL">{{ t('preferences-notifications.level.CRITICAL') }}</option>
          <option value="NONE">{{ t('preferences-notifications.level.NONE') }}</option>
        </select>
      </div>

      <div class="notif-row">
        <span class="notif-label">{{ t('preferences-notifications.channel.mail') }}</span>
        <select 
          class="level-select" 
          :value="getLevel(servicePref.priorities, 'mail')" 
          @change="setLevel(servicePref, 'mail', $event)">
          <option value="ALL">{{ t('preferences-notifications.level.ALL') }}</option>
          <option value="STANDARD">{{ t('preferences-notifications.level.STANDARD') }}</option>
          <option value="CRITICAL">{{ t('preferences-notifications.level.CRITICAL') }}</option>
          <option value="NONE">{{ t('preferences-notifications.level.NONE') }}</option>
        </select>
      </div>

      <div class="notif-row">
        <span class="notif-label">{{ t('preferences-notifications.channel.push') }}</span>
        <select 
          class="level-select" 
          :value="getLevel(servicePref.priorities, 'push')" 
          @change="setLevel(servicePref, 'push', $event)">
          <option value="ALL">{{ t('preferences-notifications.level.ALL') }}</option>
          <option value="STANDARD">{{ t('preferences-notifications.level.STANDARD') }}</option>
          <option value="CRITICAL">{{ t('preferences-notifications.level.CRITICAL') }}</option>
          <option value="NONE">{{ t('preferences-notifications.level.NONE') }}</option>
        </select>
      </div>

    </div>
  </div>
</div>

<div class="form-footer">
  <button type="submit" class="btn-primary">
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
@use '../assets/mce-shared' as *;
@use '@gip-recia/ui/components/tags';



.info-disclosure {
    border: 1px solid var(--recia-stroke) !important;
    border-radius: 8px;
    margin-bottom: 30px;
    overflow: hidden;
    background-color: #ffffff; 
}

.info-summary {
    position: relative;
    padding: 16px 20px;
    cursor: pointer;
    list-style: none; 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.05);
}

.info-summary::-webkit-details-marker {
    display: none;
}

.info-summary:hover {
    background-color: #f1f5f9; 
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.info-summary::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgb(237, 237, 237);
    opacity: 0.2; 
    transition: opacity 0.3s ease;
    z-index: 0; 
}

.info-disclosure[open] .info-summary::before {
    opacity: 0.5;
}

.summary-text {
    position: relative;
    z-index: 1; 
    color: #000000 !important; 
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;
}

.info-summary::-webkit-details-marker {
    display: none;
}

.info-summary::marker {
    content: none;
}

.summary-text::before {
    content: none;
}

.info-disclosure[open] .summary-text::before {
    transform: none;
}

.info-content {
    position: relative;
    padding: 20px;
}

.info-content::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: f00000;
    z-index: 0;
}

.info-content-hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.05);
}

.priority-list {
    position: relative;
    z-index: 1; 
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.priority-list li {
    font-size: 14px;
    color: #000000 !important; 
}

.tag {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
}
.tag.crit { background-color: #fee2e2; color: #dc2626; }
.tag.std { background-color: #e0f2fe; color: #0284c7; }
.tag.min { background-color: #f1f5f9; color: #3b7a44; }

.priority-category {
    margin-bottom: 24px;
}

.priority-category:last-child {
    margin-bottom: 0;
}

.category-header {
    margin-bottom: 12px;
}

.dynamic-notif-list {
    margin: 0;
    padding-left: 12px;
    list-style: none; 
    border-left: 2px solid #e2e8f0; 
}

.dynamic-notif-list li {
    font-size: 14px;
    color: #334155;
    margin-bottom: 8px;
    line-height: 1.5;
    padding-left: 10px;
}

.dynamic-notif-list li strong {
    color: #0f172a;
    font-weight: 600;
}

.dynamic-notif-list li:last-child {
    margin-bottom: 0;
}

/*___________________________________________________________________*/


.quick-actions {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px; 
  margin-bottom: 30px;
  padding: 16px 20px;
  background-color: #ffffff;
  border: 1px solid var(--recia-stroke) !important;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.section-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e2e8f0; 
}

.quick-actions-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
}

.section-title {
  font-weight: 700;
  color: #1e293b;
  font-size: 18px;
  margin: 0;
  display: flex;
  align-items: center;
}

.icon-section {
  color: #64748b;
  margin-right: 10px;
  font-size: 16px;
}

.quick-actions-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  flex: 1;
}

.btn-quick {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  gap: 12px;
  padding: 8px 14px;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  color: #334155;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1 1 auto;
}

.btn-quick:hover {
  background-color: #f8fafc;
  border-color: #94a3b8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.channel-icon {
  color: #64748b;
  width: 16px;
  text-align: center;
}

.toggle-icon {
  font-size: 18px;
  transition: color 0.2s ease;
}



.btn-quick.is-all-active .toggle-icon {
  color: #16a34a; 
}

.btn-quick:not(.is-all-active) .toggle-icon {
  color: #94a3b8; 
}

@media (max-width: 768px) {
  .quick-actions {
    flex-direction: column; 
    align-items: flex-start;
  }
  
  .quick-actions-buttons {
    width: 100%;
    flex-direction: column; 
  }

  .btn-quick {
    width: 100%; 
  }
}


/*______________________________________________________*/

.preferences-container,
#prefsForms {
  width: 100%;
  max-width: 1800px; 
  margin: 0 auto;
  box-sizing: border-box;
}

.preferences-container * {
  box-sizing: border-box;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  width: 100%;
  align-items: start;
}

@media (max-width: 2000px) {
  .cards-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (max-width: 1400px) {
  .cards-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .cards-grid { grid-template-columns: 1fr;
}

  

}

.service-card {
  width: 100%;
  min-width: 0;
  max-width: none;
  border: 1px solid var(--recia-stroke) !important;
  border-radius: 8px;
}

.service-card:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.card-header {
    padding: 15px 20px;
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header h3 {
    margin: 0;
    font-size: 16px;
    color: #1e293b;
    font-weight: 700;
}

.badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
.badge-active { background-color: #dcfce7; color: #166534; }
.badge-inactive { background-color: #fee2e2; color: #991b1b; }

.card-body {
    padding: 15px 20px;
}

.notif-row {
    display: grid;
    grid-template-columns: 160px 1fr;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px dashed #e2e8f0;
}

.notif-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.notif-label {
    font-weight: 600;
    color: #475569;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.icon-help {
    font-size: 12px;
    cursor: help; 
}

.level-select {
    padding: 8px 10px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background-color: #ffffff;
    font-size: 13px;
    color: #1e293b;
    cursor: pointer;
    width: 100%; 
    max-width: 280px;
    outline: none;
    transition: border-color 0.2s;
    text-overflow: ellipsis; 
}

.level-select:focus {
    border-color: var(--recia-primary);
}

/*___________________________________________________________*/


    .btn-submit {
        width: 100%;
        justify-content: center;
    }

.form-footer {
    display: flex;
    justify-content: flex-end; 
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0; 
    width: 100%;
}



</style>