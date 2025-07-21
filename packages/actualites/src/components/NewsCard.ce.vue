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
import type { ItemVO } from '@/types/ItemVO.ts'
import type { PageType } from '@/types/PageType'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  item: ItemVO
  setReadingUrl: string
  getItemByIdUrl: string
  pageOrigin: boolean
  isRead: boolean
  pageType: PageType

}>()

const { t, d } = useI18n()

function docSizeToUse() {
  if (props.item.article.files.length === 0) {
    return t('text.files.file-count-none')
  }
  else if (props.item.article.files.length === 1) {
    return t('text.files.file-count-one')
  }
  else {
    return t('text.files.file-count', { count: props.item.article.files.length })
  }
}
</script>

<template>
  <article tabindex="0" :class="{ active: !isRead, pageOrigin }">
    <div v-if="item.article.enclosure !== null" class="card-img">
      <img class="image" :src="item.article.enclosure" alt="">
    </div>
    <div class="article-wrapper">
      <span v-if="!pageOrigin" class="source">
        {{ item.source }}
      </span>

      <p v-if="pageOrigin" class="infos">
        <span>{{ d(item.pubDate, 'short') }}</span>
        <span class="article-wrapper-lecture">
          {{ t(`text.normal.${isRead ? '' : 'not-'}read`) }}
        </span>
      </p>

      <h3 class="h4">
        {{ item.article.title }}
      </h3>
      <p class="card-body-description">
        {{ item.article.description }}
      </p>
      <span v-if="pageType === 'Documents'" class="doc-size all">
        {{ docSizeToUse() }}
      </span>
      <span v-if="pageOrigin" class="source all">
        {{ item.source }}
      </span>
    </div>
  </article>
</template>

<style lang="scss">
@use '@/assets/global.scss' as *;

article {
  background-color: $white;
  border-radius: 10px;
  display: flex;
  height: 138px;
  width: auto;
  flex-direction: row;
  box-shadow: $shadow-neutral rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  transition:
    outline 0.15s ease-out,
    box-shadow 0.15s ease-out,
    background-color 0.15s ease-out,
    box-shadow 0.15s ease-out;

  h3 {
    transition: color 0.15s ease-out;
  }

  &:focus-visible {
    outline: 2px solid $primary;
    h3 {
      color: $primary;
    }
  }

  &:not(.active) {
    background-color: $basic-grey;
    box-shadow: unset;

    &:hover {
      background-color: $white;

      .card-img {
        opacity: unset;
      }
    }

    .card-img {
      filter: saturate(0%);
      opacity: 40%;
    }
  }

  .card-img {
    display: flex;
    flex: 0 0 auto;
    width: 92px;
    height: 100%;
    overflow: hidden;
    position: relative;
    justify-content: center;
    transition:
      opacity 0.15s ease-out,
      filter 0.15s ease-out;

    .image {
      height: 100%;
      object-fit: cover;
      transform-origin: center;
      transition: transform 0.15s ease-out;
    }
  }

  .article-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 16px;
    gap: 0.3em;

    &-lecture {
      font-style: italic;
    }

    .source {
      flex-shrink: 0;
      display: flex;
      font-family: $dm-sans;
      color: $basic-black;
      font-size: 12px;
      opacity: 50%;
      justify-content: space-between;
      align-items: center;

      &.all {
        justify-content: right;
      }
    }

    .infos {
      display: flex;
      font-family: $dm-sans;
      color: $basic-black;
      font-size: 12px;
      opacity: 75%;
      justify-content: space-between;
      align-items: center;
    }

    .card-body-description {
      height: 100%;
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
      text-wrap: wrap;
      font-family: $dm-sans;
      font-size: 13px;
      font-weight: 400;
      -webkit-box-orient: vertical;
      line-height: var(--description-font-line-heigth);
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  &.pageOrigin {
    height: 170px;

    &.active {
      h3 {
        color: $primary;
      }
    }
  }
}

@media only screen and (width > 1024px) {
  article {
    &:not(.pageOrigin) {
      height: 175px;
    }

    &.pageOrigin {
      height: 150px;

      &.active {
        h3 {
          color: $basic-black;
        }

        &:hover,
        &:focus-visible {
          h3 {
            color: $primary;
          }
        }
      }
    }

    &:hover,
    &:focus-visible {
      outline: 2px solid $primary;
      box-shadow: $shadow-hover $primary-20;
      .image {
        transform: scale(1.3);
      }

      &:not(.active) {
        outline: 2px solid $lighter-black;
        box-shadow: unset;
      }

      h3 {
        color: $primary;
      }
    }
  }
}
</style>
