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

import { defineCustomElement } from 'vue'
import AllNewsSFC from '@/components/AllNews.ce.vue'
import BottomSheetCeSfc from '@/components/BottomSheet.ce.vue'
import CustomToggleSwitchSFC from '@/components/CustonToggleSwitch.ce.vue'
import FontAwesomeIconSFC from '@/components/FontAwsomeIcon.ce.vue'
import I18nHostSFC from '@/components/I18nHost.ce.vue'
import NewsCardSFC from '@/components/NewsCard.ce.vue'
import CarrouselSFC from '@/components/NewsCarousel.ce.vue'
import NewsFilterSectionSFC from '@/components/NewsFilterSection.ce.vue'
import PageSelectorSFC from '@/components/PageSelector.ce.vue'

const I18nHost = defineCustomElement(I18nHostSFC)
const FontAwesomeIcon = defineCustomElement(FontAwesomeIconSFC)
const AllNews = defineCustomElement(AllNewsSFC)
const BottomSheet = defineCustomElement(BottomSheetCeSfc)
const Carrousel = defineCustomElement(CarrouselSFC)
const CustomToggleSwitch = defineCustomElement(CustomToggleSwitchSFC)
const NewsCard = defineCustomElement(NewsCardSFC)
const NewsFilterSection = defineCustomElement(NewsFilterSectionSFC)
const PageSelector = defineCustomElement(PageSelectorSFC)

declare module 'vue' {
  export interface GlobalComponents {
    I18nHost: typeof I18nHost
    FontAwesomeIcon: typeof FontAwesomeIcon
    AllNews: typeof AllNews
    Bottomsheet: typeof BottomSheet
    Carrousel: typeof Carrousel
    CustomToggleSwitch: typeof CustomToggleSwitch
    NewsCard: typeof NewsCard
    NewsFilterSection: typeof NewsFilterSection
    PageSelector: typeof PageSelector
  }
}

function register() {
  customElements.define('i18n-host', I18nHost)
  customElements.define('font-awesome-icon', FontAwesomeIcon)
  customElements.define('all-news', AllNews)
  customElements.define('bottom-sheet', BottomSheet)
  customElements.define('carrousel-ui', Carrousel)
  customElements.define('custom-toggle-switch', CustomToggleSwitch)
  customElements.define('news-card', NewsCard)
  customElements.define('news-filter-section', NewsFilterSection)
  customElements.define('page-selector', PageSelector)
}

export {
  AllNews,
  BottomSheet,
  Carrousel,
  CustomToggleSwitch,
  FontAwesomeIcon,
  I18nHost,
  NewsCard,
  NewsFilterSection,
  PageSelector,
  register,
}
