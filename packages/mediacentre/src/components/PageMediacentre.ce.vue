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
import type { Filtres } from '@/types/FiltresType'
import type { Ressource } from '@/types/RessourceType'
import type { InfoModal } from '@gip-recia/info-modal'
import i18n from '@/plugins/i18n.ts'
import { setError } from '@/services/ServiceErreurMediacentre'
import { getFilters as filtrage } from '@/services/ServiceFiltreMediacentre'
import { createResourceFromJson } from '@/types/RessourceType'
import { initToken } from '@/utils/axiosUtils'
import { CustomError } from '@/utils/CustomError'
import { EtablissementsData } from '@/utils/EtablissementsData'
import { soffit } from '@/utils/soffitUtils'
import { displayedEtablissementUai, etablissementsData, filtre, gestionAffectations } from '@/utils/store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, ref, watch } from 'vue'
import { getConfig, getFavorites, getFilters, getGestionAffectations, getResources, putFavorites } from '../services/ServiceMediacentre'

defineOptions({ name: 'PageMedia' })

const props = withDefaults(
  defineProps<{
    baseApiUrl?: string
    configApiUrl?: string
    gestionApiUrl?: string
    userInfoApiUrl?: string
    userRightsApiUrl?: string
    getUserFavoriteResourcesUrl?: string
    putUserFavoriteResourcesUrl?: string
    fnameMediacentreUi?: string
    uaiCurrent?: string
    uai?: string
    helpLocation?: string
  }>(),
  {
    baseApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_API_URI,
    configApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_CONFIG_API_URI,
    gestionApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_GESTION_API_URI,
    userInfoApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_CONTEXT + import.meta.env.VITE_APP_MEDIACENTRE_USER_INFO_API_URI,
    userRightsApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_CONTEXT + import.meta.env.VITE_APP_MEDIACENTRE_USER_RIGHTS_API_URI,
    getUserFavoriteResourcesUrl: import.meta.env.VITE_APP_MEDIACENTRE_CONTEXT + import.meta.env.VITE_APP_MEDIACENTRE_USER_GET_USER_FAVORITE_RESOURCES_API_URI,
    putUserFavoriteResourcesUrl: import.meta.env.VITE_APP_MEDIACENTRE_CONTEXT + import.meta.env.VITE_APP_MEDIACENTRE_USER_PUT_USER_FAVORITE_RESOURCES_API_URI,
    fnameMediacentreUi: import.meta.env.VITE_APP_MEDIACENTRE_FNAME,
    uaiCurrent: import.meta.env.VITE_APP_MEDIACENTRE_CLAIM_UAI_CURRENT,
    uai: import.meta.env.VITE_APP_MEDIACENTRE_CLAIM_UAI,
    helpLocation: import.meta.env.VITE_APP_MEDIACENTRE_HELP_PAGE_LOCATION,
  },
)

const filtres = ref<Array<Filtres>>([])
const resources = ref<Array<Ressource>>([])
const resourcesForSelectedEtab = ref<Array<Ressource>>([])
const filteredResources = ref<Array<Ressource>>([])
const chargement = ref<boolean>(false)
const chargementApp = ref<boolean>(false)
const isModalOpen = ref(false)
const resourceTitle = ref<string>('')
const resourceReference = ref<string>('')
const resourceEditor = ref<string>('')
const resourceDescription = ref<string | undefined>()
const erreur = ref<string>('')
const filtresResponse = ref<Array<string>>([])
const modalToUse = ref<string>('card')
const gestionHTML = ref<string>('')
const { t } = i18n.global

let triggerElement: any
document.addEventListener('openModale', (event: any) => {
  triggerElement = event.detail.originalEvent
  const modalElement: InfoModal = document.querySelector('info-modal')
  modalElement.isOpen = !modalElement.isOpen
  modalElement.titleModal = event.detail.title
  modalElement.mainElement = document.querySelector('body > main, body > div')
})

document.addEventListener('closeModale', (event) => {
  if (triggerElement) {
    triggerElement.focus()
    event.preventDefault()
  }
})

const countNbFilteredResources = computed<number>(() => {
  return filteredResources.value.length
})

onMounted(async (): Promise<void> => {
  try {
    chargementApp.value = true
    await initToken(props.userInfoApiUrl)
    await getConfig(props.configApiUrl)
    await updateRessources()
    await updateGestionValue()
    await setFavoris()
    await getFiltres()
    updateEtablissementsDataInStore()
    getResourcesByFilter(filtre.value, '')
  }
  catch (e: any) {
    erreur.value = setError(e.statusCode)
  }
  finally {
    chargementApp.value = false
  }
})

function getAllEtabUai(): string[] | undefined {
  if (soffit.value === undefined) {
    return undefined
  }
  return (soffit.value[props.uai] as string[])
}

function updateEtablissementsDataInStore(): void {
  const etabUais: string[] | undefined = getAllEtabUai()
  if (etabUais === undefined) {
    return
  }
  const mapEtabUaiEtabName: Map<string, string> = new Map()
  if (etabUais === undefined) {
    return
  }
  for (let index = 0; index < etabUais.length; index++) {
    const etabUai = etabUais[index]

    for (let indexRes = 0; indexRes < resources.value.length; indexRes++) {
      const ressource = resources.value[indexRes]
      if (ressource.idEtablissement === undefined || ressource.idEtablissement === null || ressource.idEtablissement.length === 0) {
        continue
      }
      for (let index = 0; index < ressource.idEtablissement.length; index++) {
        const iteratedEtablissement = ressource.idEtablissement[index]
        if (iteratedEtablissement.UAI === etabUai) {
          if (iteratedEtablissement.nom !== undefined) {
            mapEtabUaiEtabName.set(etabUai, iteratedEtablissement.nom)
          }
          else {
            mapEtabUaiEtabName.set(etabUai, t('menu-mediacentre.unknown-etab'))
          }
        }
      }
    }
  }
  const uaicourant: string | undefined = getUaiOfEtablissementCourant()
  if (uaicourant === undefined) {
    return
  }
  const myEtabsData = new EtablissementsData()
  if (mapEtabUaiEtabName.has(uaicourant)) {
    myEtabsData.courant = uaicourant
  }
  else {
    const key = mapEtabUaiEtabName.keys().next().value
    myEtabsData.courant = key === undefined ? '-1' : key
  }
  myEtabsData.tout = mapEtabUaiEtabName
  etablissementsData.value = myEtabsData
  displayedEtablissementUai.value = myEtabsData.courant
}

function getUaiOfEtablissementCourant(): string | undefined {
  if (soffit.value === undefined) {
    return undefined
  }
  const temp = soffit.value[props.uaiCurrent] as string[]
  if (temp.length === 1) {
    return temp[0]
  }
}

async function updateRessources(): Promise<void> {
  chargement.value = true
  try {
    const reponse = await getResources(props.baseApiUrl, props.userRightsApiUrl)
    const res = reponse

    resources.value = res.map(createResourceFromJson)
  }
  catch (e: any) {
    throw new CustomError(e.message, e.statusCode)
  }
  finally {
    chargement.value = false
  }
}

function updateFiltre(value: CustomEvent): void {
  filtre.value = value.detail[0]
  const idCategorie = value.detail[1]
  if (filtre.value === 'favoris') {
    getFavoris()
  }
  else {
    getResourcesByFilter(filtre.value, idCategorie)
  }
}

async function setFavoris(): Promise<void> {
  try {
    const resourceFavoriteIds = await getFavorites(props.getUserFavoriteResourcesUrl, props.fnameMediacentreUi)
    const resourceFavorites = resources.value.filter(res => resourceFavoriteIds.includes(res.idRessource))
    resourceFavorites.forEach(res => (res.isFavorite = true))
  }
  catch (e: any) {
    console.error(e)
  }
}

async function updateFavori(event: CustomEvent) {
  const idResource = event.detail[0]
  const isFavorite = event.detail[1]

  const resourceFavorite = resourcesForSelectedEtab.value.find(res => res.idRessource === idResource)
  resourceFavorite!.isFavorite = isFavorite
  try {
    const resourceFavoriteIds = await getFavorites(props.getUserFavoriteResourcesUrl, props.fnameMediacentreUi)
    await putFavorites(
      props.putUserFavoriteResourcesUrl,
      idResource,
      isFavorite,
      resourceFavoriteIds,
      props.fnameMediacentreUi,
    )
  }
  catch (e: any) {
    console.error(e)
  }
}

function openModal(event: CustomEvent) {
  modalToUse.value = 'card'
  isModalOpen.value = true
  resourceTitle.value = event.detail[1]
  resourceEditor.value = event.detail[2]
  resourceDescription.value = event.detail[3]
  resourceReference.value = event.detail[4]
}

function openGestionModal(event: CustomEvent) {
  modalToUse.value = 'gestion'
  isModalOpen.value = true
  gestionHTML.value = event.detail[0]
}

async function getFavoris(): Promise<void> {
  chargement.value = true
  try {
    const idResourceFavorites = await getFavorites(props.getUserFavoriteResourcesUrl, props.fnameMediacentreUi)
    filteredResources.value = resourcesForSelectedEtab.value.filter(res => idResourceFavorites.includes(res.idRessource))
    filteredResources.value.forEach(res => (res.isFavorite = true))
  }
  catch (error: any) {
    console.error(error)
  }
  finally {
    chargement.value = false
  }
}

function getResourcesByFilter(filtre: string, idCategorie: string): void {
  chargement.value = true
  try {
    switch (idCategorie) {
      case 'NIVEAU_EDUCATIF_FILTER':
        filteredResources.value = resourcesForSelectedEtab.value.filter(ressource =>
          ressource.niveauEducatif.some(e => e.nom === filtre),
        )
        break
      case 'TYPE_PRESENTATION_FILTER':
        filteredResources.value = resourcesForSelectedEtab.value.filter(ressource => ressource.typePresentation.code === filtre)
        break
      case 'DOMAINE_ENSEIGNEMENT_FILTER':
        filteredResources.value = resourcesForSelectedEtab.value.filter(ressource =>
          ressource.domaineEnseignement.some(e => e.nom === filtre),
        )
        break
      default:
        filteredResources.value = resourcesForSelectedEtab.value
        break
    }
  }
  catch (error: any) {
    console.error(error)
  }
  finally {
    chargement.value = false
  }
}

async function getFiltres(): Promise<void> {
  chargement.value = true
  try {
    const reponse = await getFilters(props.baseApiUrl)
    filtresResponse.value = reponse
  }
  catch (error: any) {
    console.error(error)
  }
  finally {
    chargement.value = false
  }
}

async function updateGestionValue() {
  chargement.value = true
  try {
    const response = await getGestionAffectations(props.gestionApiUrl, props.userRightsApiUrl)
    if (response !== undefined) {
      gestionAffectations.value = response
    }
  }
  catch (error: any) {
    console.error(error)
  }
  finally {
    chargement.value = false
  }
}

function generateFiltresValues() {
  chargement.value = true

  try {
    filtres.value = filtrage(resourcesForSelectedEtab.value, filtresResponse.value)
  }
  catch (error: any) {
    console.error(error)
  }
  finally {
    chargement.value = false
  }
}

watch(() => displayedEtablissementUai.value, async (newUaiEtabDisplayed) => {
  const arrayRessourcesPerEtab: Array<Ressource> = []
  for (let index = 0; index < resources.value.length; index++) {
    const element = resources.value[index]
    if (element.idEtablissement === undefined || element.idEtablissement === null || element.idEtablissement.length === 0) {
      arrayRessourcesPerEtab.push(element)
    }
    else {
      for (let index = 0; index < element.idEtablissement.length; index++) {
        const subElement = element.idEtablissement[index]
        if (subElement.UAI === newUaiEtabDisplayed) {
          arrayRessourcesPerEtab.push(element)
        }
      }
    }
  }
  resourcesForSelectedEtab.value = arrayRessourcesPerEtab
  filtre.value = 'tout'
  getResourcesByFilter(filtre.value, '')
  generateFiltresValues()
})
</script>

<template>
  <i18n-host>
    <div v-if="chargementApp" class="spinner-container">
      <div class="spinner-element">
        <FontAwesomeIcon icon="fa-solid fa-circle-notch" class="fa-spinner" />
      </div>
    </div>
    <div v-else class="cadre-page-mediacentre">
      <aside class="aside-page-mediacentre">
        <menu-mediacentre class="menu-mediacentre" :filtres="filtres" :checked="filtre" @update-checked="updateFiltre" @open-gestion-modal="openGestionModal" />
      </aside>
      <div class="main-page-wrapper">
        <main class="main-page-mediacentre">
          <liste-ressources
            v-if="!chargement"
            :filtre="filtre"
            :ressources="filteredResources"
            :chargement="chargement"
            :base-api-url="baseApiUrl"
            :user-info-api-url="userInfoApiUrl"
            :erreur="erreur"
            :nb-resources="countNbFilteredResources"
            @update-favorite="updateFavori"
            @open-modal="openModal"
          />
        </main>
        <p class="help">
          <a :href="helpLocation" target="_blank" rel="noopener noreferrer">{{ t('page-mediacentre.help') }}</a>
        </p>
      </div>
      <Teleport to="body">
        <info-modal id="modale" debug="false" style="z-index: 99;">
          <template v-if="modalToUse === 'card'">
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
            <div slot="modal-body">
              <div style="display: flex; flex-direction: column; gap: 3em">
                <div style="display: flex; flex-direction: column; gap: 0.5em">
                  <span>Ref : {{ resourceReference }}</span>
                  <span>{{ t('resource-info-modal-mediacentre.editor') }} {{ resourceEditor }}</span>
                </div>
                <div v-if="resourceDescription" class="description-modal">
                  {{ resourceDescription }}
                </div>
              </div>
            </div>
          </template>
          <template v-if="modalToUse === 'gestion'">
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
            <div slot="modal-body">
              <p v-html="gestionHTML" />
            </div>
          </template>
        </info-modal>
      </Teleport>
    </div>
  </i18n-host>
</template>

<style lang="scss" scoped>
.spinner-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;

  .spinner-element {
    color: #d3d3d3;
    width: 10em;
    height: 10em;

    @keyframes spinner {
      to {
        transform: rotate(360deg);
      }
    }

    .fa-spinner {
      animation: spinner 2s linear infinite;
    }
  }
}
.cadre-page-mediacentre {
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 5px;
  height: 100%;
  width: 100%;

  .aside-page-mediacentre {
    align-items: flex-start;
    height: 100%;
    display: flex;
    flex-direction: row;
    margin-right: 1em;

    menu-mediacentre {
      position: relative;
      height: 70px;
    }
  }

  .main-page-mediacentre {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
}

@media only screen and (max-width: 650px) {
  .cadre-page-mediacentre {
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    margin: 0;
    display: flex;
    align-content: space-around;
    overflow: hidden;
    row-gap: 0;
    height: 100%;

    .aside-page-mediacentre {
      height: fit-content;
      max-height: 100%;
      min-height: 5em;
      justify-content: center;
      padding: 0;
      margin: 0;
      width: 100%;
      z-index: 2;
      box-shadow: 0px 10px 15px -7px rgba(0, 0, 0, 0.1);
      transition: height 3s ease-in-out;

      menu-mediacentre {
        max-height: 100vh;
        width: 100%;
      }
    }

    .main-page-mediacentre {
      box-sizing: border-box;
      height: calc(100% - 30px);
      margin: 0;
      padding: 0;
      flex-shrink: 0;
      flex-grow: 0;
      justify-content: center;

      liste-ressources {
        width: 100%;
      }
    }
  }
}

.main-page-wrapper {
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  p {
    text-align: center;
    width: 100%;
    a {
      width: auto;
      display: block;
      color: revert;
      text-decoration: none;
    }
  }
}

p {
  &.help {
    height: 20px;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
</style>
