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
import { PaginationNumber } from '@/utils/PaginationNumber';
import { ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  lastPageIndexHumanReadable: number;
  currentPageIndexHumanReadable: number;
}>();

function goToPage(item: PaginationNumber){
  if (item.isPrevious) {
    if (props.currentPageIndexHumanReadable == 1) {
      return;
    } else {
      emit('goToPage', props.currentPageIndexHumanReadable - 1);
    }
  }

  if (item.isNext) {
    if (props.currentPageIndexHumanReadable == props.lastPageIndexHumanReadable) {
      return;
    } else {
      emit('goToPage', props.currentPageIndexHumanReadable + 1);
    }
  }

  if (item.pageNumber == props.currentPageIndexHumanReadable) {
    return;
  }
  emit('goToPage', item.pageNumber);
}

const maxNumberVisible = 6;
const allPagesToDisplay = ref<Array<PaginationNumber>>(new Array());
const emit = defineEmits<{
  (event: 'goToPage', payload: number): void;
}>();

watch(props, async (oldProps, newProps) => {
  allPagesToDisplay.value = pagesSet();
});

const getPageIndexCampledHumanReadable = (pageIndex: number): number => {
  pageIndex = Math.max(1, pageIndex);
  pageIndex = Math.min(pageIndex, props.lastPageIndexHumanReadable);
  return pageIndex;
};

const pagesSet = (): Array<PaginationNumber> => {
  const pageSet: Set<number> = new Set();
  pageSet.add(1)
  pageSet.add(getPageIndexCampledHumanReadable(props.currentPageIndexHumanReadable - 1))
  pageSet.add(getPageIndexCampledHumanReadable(props.currentPageIndexHumanReadable))
  pageSet.add(getPageIndexCampledHumanReadable(props.currentPageIndexHumanReadable + 1))
  pageSet.add(props.lastPageIndexHumanReadable)

  const pageArray: Array<PaginationNumber> = new Array();
  pageArray.push(PaginationNumber.getPrevious(props.currentPageIndexHumanReadable))
  for (const element of pageSet) {
    pageArray.push(PaginationNumber.getPaginationNumber(element));
  }
  pageArray.push(PaginationNumber.getNext(props.currentPageIndexHumanReadable))
  return pageArray;
};

const classArrayForPaginationNumber = (paginationNumber : PaginationNumber): string[] => {
  let classArray = new Array();
  classArray.push('pagination-button');
  if (paginationNumber.pageNumber == props.currentPageIndexHumanReadable) {
    classArray.push('active');
  }
  return classArray;
};

const disabledForPaginationNumber = (paginationNumber: PaginationNumber): boolean => {
  return (
    (paginationNumber.isPrevious && props.currentPageIndexHumanReadable == 1) ||
    (paginationNumber.isNext && props.currentPageIndexHumanReadable == props.lastPageIndexHumanReadable)
  );
};

const keyFromPaginationNumber = (paginationNumber: PaginationNumber): number => {
  if (paginationNumber.isFirst) {
    return -4;
  } else if (paginationNumber.isPrevious) {
    return -3;
  } else if (paginationNumber.isNext) {
    return -2;
  } else if (paginationNumber.isLast) {
    return -1;
  } else {
    return paginationNumber.pageNumber;
  }
};
</script>

<template>
  <div class="pagination" v-if="props.lastPageIndexHumanReadable > 0">
    <button
      v-for="item in allPagesToDisplay"
      :key="keyFromPaginationNumber(item)"
      @click="goToPage(item)"
      :class="classArrayForPaginationNumber(item)"
      :disabled="disabledForPaginationNumber(item)"
    >
      <span v-if="item.isEllipsisDots">
        <font-awesome-icon :icon="['fa', 'ellipsis-h']" class="pagination-icon" />
      </span>
      <span v-else-if="item.isPrevious">
        <font-awesome-icon :icon="['fa', 'angle-left']" class="pagination-icon" />
      </span>
      <span v-else-if="item.isNext">
        <font-awesome-icon :icon="['fa', 'angle-right']" class="pagination-icon" />
      </span>
      <span v-else>
        {{ item.pageNumber }}
      </span>
    </button>
  </div>
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
  &:active{
    text-decoration: none;
  }

}

button {
  height: 25px;
  width: 25px;
  align-self: baseline;
}

.pagination {
  display: flex;
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
</style>
