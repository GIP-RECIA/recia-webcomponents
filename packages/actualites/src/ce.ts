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

import AllNewsSFC from '@/components/AllNews.ce.vue'
import CustomToggleSwitchSFC from '@/components/CustonToggleSwitch.ce.vue'
import I18nHostSFC from '@/components/I18nHost.ce.vue'
import NewsCardSFC from '@/components/NewsCard.ce.vue'
import NewsCardCarrouselSFC from '@/components/NewsCardCarrousel.ce.vue'
import CarrouselSFC from '@/components/NewsCarousel.ce.vue'
import NewsFilterSectionSFC from '@/components/NewsFilterSection.ce.vue'
import PreviewSFC from '@/components/NewsPreview.ce.vue'
import PageSelectorSFC from '@/components/PageSelector.ce.vue'
import ViewItemSFC from '@/components/ViewItem.ce.vue'
import { defineCustomElement } from 'vue'

const I18nHost = defineCustomElement(I18nHostSFC)
const NewsCard = defineCustomElement(NewsCardSFC)
const Carrousel = defineCustomElement(CarrouselSFC)
const Preview = defineCustomElement(PreviewSFC)
const AllNews = defineCustomElement(AllNewsSFC)
const CustomToggleSwitch = defineCustomElement(CustomToggleSwitchSFC)
const NewsCardCarrousel = defineCustomElement(NewsCardCarrouselSFC)
const NewsFilterSection = defineCustomElement(NewsFilterSectionSFC)
const PageSelector = defineCustomElement(PageSelectorSFC)

const ViewItem = defineCustomElement(ViewItemSFC)
declare module 'vue' {
  export interface GlobalComponents {
    I18nHost: typeof I18nHost
    NewsCard: typeof NewsCard
    Carrousel: typeof Carrousel
    Preview: typeof Preview
    AllNews: typeof AllNews
    CustomToggleSwitch: typeof CustomToggleSwitch
    NewsFilterSection: typeof NewsFilterSection
    ViewItem: typeof ViewItem
    PageSelector: typeof PageSelector
  }
}

function register() {
  customElements.define('i18n-host', I18nHost)
  customElements.define('news-card-carrousel', NewsCardCarrousel)
  customElements.define('carrousel-ui', Carrousel)
  customElements.define('preview-ui', Preview)
  customElements.define('all-news', AllNews)
  customElements.define('custom-toggle-switch', CustomToggleSwitch)
  customElements.define('news-card', NewsCard)
  customElements.define('news-filter-section', NewsFilterSection)
  customElements.define('view-item', ViewItem)
  customElements.define('page-selector', PageSelector)
}

export { AllNews, Carrousel, CustomToggleSwitch, I18nHost, NewsCard, NewsCardCarrousel, NewsFilterSection, Preview, register, ViewItem, PageSelector }