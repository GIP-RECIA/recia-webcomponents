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
import { displayedEtablissementSiren, etablissementsData, etablissementsMap, filtre } from '@/utils/store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, ref, watch } from 'vue'
import { getConfig, getFavorites, getFilters, getResources, putFavorites } from '../services/ServiceMediacentre'

defineOptions({ name: 'PageMedia' })

const props = withDefaults(
  defineProps<{
    baseApiUrl?: string
    configApiUrl?: string
    userInfoApiUrl?: string
    userRightsApiUrl?: string
    getUserFavoriteResourcesUrl?: string
    putUserFavoriteResourcesUrl?: string
    fnameMediacentreUi?: string
    escosirencurent?: string
    escosiren?: string
    helpLocation? : string,
  }>(),
  {
    baseApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_API_URI,
    configApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_CONFIG_API_URI,
    userInfoApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_USER_INFO_API_URI,
    userRightsApiUrl: import.meta.env.VITE_APP_MEDIACENTRE_USER_RIGHTS_API_URI,
    getUserFavoriteResourcesUrl: import.meta.env.VITE_APP_MEDIACENTRE_USER_GET_USER_FAVORITE_RESOURCES_API_URI,
    putUserFavoriteResourcesUrl: import.meta.env.VITE_APP_MEDIACENTRE_USER_PUT_USER_FAVORITE_RESOURCES_API_URI,
    fnameMediacentreUi: import.meta.env.VITE_APP_MEDIACENTRE_FNAME,
    escosirencurent: import.meta.env.VITE_APP_MEDIACENTRE_CLAIM_ESCOSIREN_COURANT,
    escosiren: import.meta.env.VITE_APP_MEDIACENTRE_CLAIM_ESCOSIREN,
    helpLocation: import.meta.env.VITE_APP_MEDIACENTRE_HELP_PAGE_LOCATION,
  },
)

// const filtre = ref('tout')
const filtres = ref<Array<Filtres>>([])
const ressources = ref<Array<Ressource>>([])
const ressourcesForSelectedEtab = ref<Array<Ressource>>([])
const filteredResources = ref<Array<Ressource>>([])
const chargement = ref<boolean>(false)
const chargementApp = ref<boolean>(false)
const isModalOpen = ref(false)
const resourceTitle = ref<string>('')
const resourceReference = ref<string>('')
const resourceEditor = ref<string>('')
const resourceDescription = ref<string | undefined>()
const erreur = ref<string>('')
const etabIds = ref<string[]>()
const filtresResponse = ref<Array<string>>([])

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
    await getRessources()
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

function getAllEtabId() {
  if (soffit.value === undefined) {
    return
  }
  etabIds.value = (soffit.value[props.escosiren] as string[])
}

function updateEtablissementsDataInStore(): void {
  getAllEtabId()
  if (soffit.value === undefined) {
    return
  }
  const mapEtabIdEtabName: Map<string, string> = new Map()
  if (etabIds.value === undefined) {
    return
  }
  for (let index = 0; index < etabIds.value.length; index++) {
    const etabId = etabIds.value[index]

    for (let indexRes = 0; indexRes < ressources.value.length; indexRes++) {
      const ressource = ressources.value[indexRes]
      if (ressource.idEtablissement[0].id === etabId) {
        if (ressource.idEtablissement[0].nom !== undefined) {
          mapEtabIdEtabName.set(etabId, ressource.idEtablissement[0].nom)
        }
        continue
      }
    }
  }
  const sirencourant: string | undefined = getIdOfEtablissementCourant()
  if (sirencourant === undefined) {
    return
  }
  const myEtabsData = new EtablissementsData()
  myEtabsData.courant = sirencourant
  myEtabsData.tout = mapEtabIdEtabName
  etablissementsData.value = myEtabsData
  displayedEtablissementSiren.value = sirencourant
}

function getIdOfEtablissementCourant(): string | undefined {
  if (soffit.value === undefined) {
    return undefined
  }
  const temp = soffit.value[props.escosirencurent] as string[]
  if (temp.length === 1) {
    return temp[0]
  }
}

async function getRessources(): Promise<void> {
  chargement.value = true
  try {
    const reponse = await getResources(props.baseApiUrl, props.userRightsApiUrl)
    const res = reponse

    ressources.value = res.map(createResourceFromJson)
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
    const resourceFavorites = ressources.value.filter(res => resourceFavoriteIds.includes(res.idRessource))
    resourceFavorites.forEach(res => (res.isFavorite = true))
  }
  catch (e: any) {
    console.error(e)
  }
}

async function updateFavori(event: CustomEvent) {
  const idResource = event.detail[0]
  const isFavorite = event.detail[1]

  const resourceFavorite = ressourcesForSelectedEtab.value.find(res => res.idRessource === idResource)
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
  isModalOpen.value = true
  resourceTitle.value = event.detail[1]
  resourceEditor.value = event.detail[2]
  resourceDescription.value = event.detail[3]
  resourceReference.value = event.detail[4]
}

async function getFavoris(): Promise<void> {
  chargement.value = true
  try {
    const idResourceFavorites = await getFavorites(props.getUserFavoriteResourcesUrl, props.fnameMediacentreUi)
    filteredResources.value = ressourcesForSelectedEtab.value.filter(res => idResourceFavorites.includes(res.idRessource))
    filteredResources.value.forEach(res => (res.isFavorite = true))
  }
  catch (error: any) {
    console.error(error)
  }
  finally {
    chargement.value = false
  }
}

function hasResourcesForCurrentEtab(): boolean {
  if(soffit.value === undefined){
    return false
  }
  if(Array.isArray(soffit.value[props.escosirencurent]) == false){
    return false
  }
  let escosirencurentarray: string[] = <Array<string>>soffit.value[props.escosirencurent]
  if(escosirencurentarray.length === 0){
    return false
  }

  const cle:string = escosirencurentarray[0]

  const index = ressources.value.findIndex(ressource => ressource.idEtablissement.findIndex(idEtabFromSubArray => idEtabFromSubArray.id === cle) > -1)
  return index > -1
}

function getResourcesByFilter(filtre: string, idCategorie: string): void {
  chargement.value = true
  try {
    switch (idCategorie) {
      case 'NIVEAU_EDUCATIF_FILTER':
        filteredResources.value = ressourcesForSelectedEtab.value.filter(ressource =>
          ressource.niveauEducatif.some(e => e.nom === filtre),
        )
        break
      case 'TYPE_PRESENTATION_FILTER':
        filteredResources.value = ressourcesForSelectedEtab.value.filter(ressource => ressource.typePresentation.code === filtre)
        break
      // case 'UAI_FILTER':
      //   filteredResources.value = ressourcesForSelectedEtab.value.filter(ressource =>
      //     ressource.idEtablissement.some(e => e.id === filtre),
      //   )
      //   break
      case 'DOMAINE_ENSEIGNEMENT_FILTER':
        filteredResources.value = ressourcesForSelectedEtab.value.filter(ressource =>
          ressource.domaineEnseignement.some(e => e.nom === filtre),
        )
        break
      default:
        filteredResources.value = ressourcesForSelectedEtab.value
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

function generateFiltresValues() {
  chargement.value = true

  try {
    filtres.value = filtrage(ressourcesForSelectedEtab.value, filtresResponse.value)
  }
  catch (error: any) {
    console.error(error)
  }
  finally {
    chargement.value = false
  }
}

watch(() => displayedEtablissementSiren.value, async (newSirenEtabDisplayed, oldSirenEtabDisplayed) => {
  const arrayRessourcesPerEtab: Array<Ressource> = []
  for (let index = 0; index < ressources.value.length; index++) {
    const element = ressources.value[index]
    if (element.idEtablissement[0].id === newSirenEtabDisplayed) {
      arrayRessourcesPerEtab.push(element)
    }
  }
  ressourcesForSelectedEtab.value = arrayRessourcesPerEtab
  filtre.value = 'tout'
  getResourcesByFilter(filtre.value, '')
  generateFiltresValues()
  const buttons = document.getElementsByClassName('categories-container')
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
        <menu-mediacentre :filtres="filtres" :checked="filtre" @update-checked="updateFiltre" />
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
      <p><a :href="helpLocation" target="_blank" rel="noopener noreferrer">{{ t('page-mediacentre.help') }}</a></p>
    </div>
      <Teleport to="body">
        <info-modal id="modale" debug="false">
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
  gap: 4em;
  padding: 2em;
  height: 100%;
  width: 100%;

  .aside-page-mediacentre {
    align-items: flex-start;
    height: 100%;
    display: flex;
    flex-direction: row;
    margin-right: 1em;

    menu-mediacentre {
      height: 100%;
    }
  }

  .main-page-mediacentre {
    width: 100%;
    height: 95%;
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
      height: calc(100% - 70px);
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
  height: 95%;
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
</style>
