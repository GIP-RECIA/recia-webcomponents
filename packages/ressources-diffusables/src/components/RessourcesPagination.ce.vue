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

function clickfct(item: number){
  if (item == props.currentPageIndexHumanReadable) {
    return;
  }
  emit('goToPage', item);
}


const maxNumberVisible = 6;
const allPagesToDisplay = ref<Array<PaginationNumber>>(new Array());
const emit = defineEmits<{
  (event: 'goToPage', payload: number): void;
}>();

watch(props, async (oldProps, newProps) => {
 console.log("pros changed")
 allPagesToDisplay.value = pagesSet();
});


const pagesSet = (): Array<PaginationNumber> => {
  let thePreArray: Array<number> = new Array();
  let theArray: Array<PaginationNumber> = new Array();
  if (props.lastPageIndexHumanReadable <= maxNumberVisible) {
    for (let index = 0; index <= maxNumberVisible; index++) {
      theArray.push(PaginationNumber.getPaginationNumber(index));
      return theArray;
    }
  }


  const nbrPagesNonExtremite = maxNumberVisible - 2;

  if (props.currentPageIndexHumanReadable == 1) {
    for (let index = 1; index <= nbrPagesNonExtremite + 1; index++) {
      thePreArray.push(index);
    }
    thePreArray.push(props.lastPageIndexHumanReadable);
  }


  //else proche 1
  //else final
  //else proche final

  //construction de l'array final
  //push fleche gauche

  //theArray.push(PaginationNumber.getFirst());
  theArray.push(PaginationNumber.getPrevious(props.currentPageIndexHumanReadable));
  for (let index = 0; index < thePreArray.length; index++) {
    const element = thePreArray[index];

    if (index > 0) {
      if (element - thePreArray[index - 1] > 1) theArray.push(PaginationNumber.getSeparator());
    }

    theArray.push(PaginationNumber.getPaginationNumber(element));

  }
  theArray.push(PaginationNumber.getNext(props.currentPageIndexHumanReadable));
  //theArray.push(PaginationNumber.getLast(props.lastPageIndexHumanReadable));
  return theArray;
};
</script>


<template>
  <div class="pagination">
    <button v-for="(item, index) in allPagesToDisplay" :key="index">
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


<style>

.pagination {
  display: flex;
  align-items: baseline;
  height: 3em;
  justify-content: center;
}

.pagination-icon {
  height: 1.2em;
  width: 1.2em;
  vertical-align: text-bottom;
}

button {
  height: 3em;
  width: 3em;
  align-self: baseline;
}


</style>
