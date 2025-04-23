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
import { PaginationNumber } from '@/utils/PaginationNumber'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  lastPageIndexHumanReadable: number
  currentPageIndexHumanReadable: number
}>()

const emit = defineEmits<(event: 'goToPage', payload: number) => void>()

const { t } = useI18n()

function goToPage(item: PaginationNumber) {
  if (item.isPrevious) {
    if (props.currentPageIndexHumanReadable === 1) {
      return
    }
    else {
      emit('goToPage', props.currentPageIndexHumanReadable - 1)
    }
  }

  if (item.isNext) {
    if (props.currentPageIndexHumanReadable === props.lastPageIndexHumanReadable) {
      return
    }
    else {
      emit('goToPage', props.currentPageIndexHumanReadable + 1)
    }
  }

  if (item.pageNumber === props.currentPageIndexHumanReadable) {
    return
  }
  emit('goToPage', item.pageNumber)
}

const allPagesToDisplay = ref<Array<PaginationNumber>>([])
watch(props, async () => {
  allPagesToDisplay.value = pagesSet()
})

function getPageIndexCampledHumanReadable(pageIndex: number): number {
  pageIndex = Math.max(1, pageIndex)
  pageIndex = Math.min(pageIndex, props.lastPageIndexHumanReadable)
  return pageIndex
}

function pagesSet(): Array<PaginationNumber> {
  const pageSet: Set<number> = new Set()
  pageSet.add(1)
  pageSet.add(getPageIndexCampledHumanReadable(props.currentPageIndexHumanReadable - 1))
  pageSet.add(getPageIndexCampledHumanReadable(props.currentPageIndexHumanReadable))
  pageSet.add(getPageIndexCampledHumanReadable(props.currentPageIndexHumanReadable + 1))
  pageSet.add(props.lastPageIndexHumanReadable)

  const pageArray: Array<PaginationNumber> = []
  pageArray.push(PaginationNumber.getPrevious(props.currentPageIndexHumanReadable))
  for (const element of pageSet) {
    pageArray.push(PaginationNumber.getPaginationNumber(element))
  }
  pageArray.push(PaginationNumber.getNext(props.currentPageIndexHumanReadable))
  return pageArray
}

function classArrayForPaginationNumber(paginationNumber: PaginationNumber): string[] {
  const classArray = []
  classArray.push('pagination-button')
  if (paginationNumber.pageNumber === props.currentPageIndexHumanReadable) {
    classArray.push('active')
  }
  return classArray
}

function disabledForPaginationNumber(paginationNumber: PaginationNumber): boolean {
  return (
    (paginationNumber.isPrevious && props.currentPageIndexHumanReadable === 1)
    || (paginationNumber.isNext && props.currentPageIndexHumanReadable === props.lastPageIndexHumanReadable)
  )
}

function isCurrent(paginationNumber: PaginationNumber): boolean {
  return paginationNumber.pageNumber === props.currentPageIndexHumanReadable
}

function keyFromPaginationNumber(paginationNumber: PaginationNumber): number {
  if (paginationNumber.isFirst) {
    return -4
  }
  else if (paginationNumber.isPrevious) {
    return -3
  }
  else if (paginationNumber.isNext) {
    return -2
  }
  else if (paginationNumber.isLast) {
    return -1
  }
  else {
    return paginationNumber.pageNumber
  }
}

function labelFromPaginationNumber(paginationNumber: PaginationNumber): string | undefined {
  if (paginationNumber.isFirst) {
    return t('aria-label.premier')
  }
  else if (paginationNumber.isPrevious) {
    return t('aria-label.precedent')
  }
  else if (paginationNumber.isNext) {
    return t('aria-label.suivant')
  }
  else if (paginationNumber.isLast) {
    return t('aria-label.dernier')
  }
  else {
    return t('aria-label.page', { index: paginationNumber.pageNumber })
  }
}
</script>

<template>
  <nav v-if="props.lastPageIndexHumanReadable > 0" class="pagination">
    <ul>
      <li v-for="item in allPagesToDisplay" :key="keyFromPaginationNumber(item)">
        <button
          :class="classArrayForPaginationNumber(item)"
          :disabled="disabledForPaginationNumber(item)"
          :aria-current="isCurrent(item)"
          :aria-label="labelFromPaginationNumber(item)"
          @click="goToPage(item)"
        >
          <span v-if="item.isEllipsisDots">
            <FontAwesomeIcon :icon="['fa', 'ellipsis-h']" class="pagination-icon" />
          </span>
          <span v-else-if="item.isPrevious">
            <FontAwesomeIcon :icon="['fa', 'angle-left']" class="pagination-icon" />
          </span>
          <span v-else-if="item.isNext">
            <FontAwesomeIcon :icon="['fa', 'angle-right']" class="pagination-icon" />
          </span>
          <span v-else>
            {{ item.pageNumber }}
          </span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.pagination-button {
  @extend %tag-circle;
  border: none;
  background-color: transparent;

  font-size: 12px;
  height: 40px;
  width: 40px;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
}

button {
  height: 25px;
  width: 25px;
  align-self: baseline;
}

.pagination {
  align-items: baseline;
  height: 3em;
  justify-content: center;
  gap: 4px;
}

.pagination-icon {
  height: 15px;
  width: 15px;
  vertical-align: text-bottom;
}

nav {
  ul {
    list-style: none;
    li {
      display: inline-block;
      margin-left: 4px;
      margin-right: 4px;
    }
  }
}
</style>
