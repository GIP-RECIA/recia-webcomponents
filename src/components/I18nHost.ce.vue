<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { getChangeEtab } from '@/services/serviceChangeEtab'

const props = defineProps<{
  show: boolean
  changeEtabApi: string
  userInfoApiUrl: string
}>()

const emit = defineEmits(['update:show'])

console.log('showProps: ', props.show)
let showState = ref<boolean>(props.show)
const checked = ref<string>('')
const changeetab = ref<any>([])
const etabJson = ref<string>('')
const currentEtab = ref<string>('')
const findEtab = ref<any>([])

const closeModal = () => {
  showState.value = false
  console.log('showState: ', showState.value)
}

onMounted(async () => {
  try {
    const res = await getChangeEtab(props.changeEtabApi, props.userInfoApiUrl)
    changeetab.value = res.data
    // List of structures
    etabJson.value = JSON.stringify(changeetab.value.listEtab)
    currentEtab.value = changeetab.value.currentStruct
    checked.value = currentEtab.value
  } catch (error: any) {
    console.error('error : ', error.response.data)
  }
})

watch(
  () => props.show,
  () => {
    showState.value = props.show
  }
)
watch(checked, () => console.log('checked.val : ', checked.value))

function parseStructs(): any {
  if (!etabJson.value) {
    return []
  }

  const listStructs = JSON.parse(etabJson.value)

  return listStructs
}

const structures = computed(() => parseStructs())
</script>

<template>
  <!-- Modal -->

  <div v-if="showState" @input="emit('update:show')" class="modal">
    <div>
      <div class="modal-header">
        <h1>Changer de structure</h1>
        <button type="button" class="btnClose" @click="closeModal">x</button>
      </div>

      <span class="current">Structure courante: {{ currentEtab }}</span>
      <form action="" method="post" class="formChange">
        <fieldset>
          <legend>Sélectionnez une autre structure à laquelle vous reconnecter :</legend>
          <div class="list-struct">
            <div v-for="data in structures" :key="data.idSiren" class="struct">
              <input
                type="radio"
                name=""
                :id="data.idSiren"
                :value="data.idSiren"
                v-model="checked"
              />
              <label :for="data.idSiren"> {{ data.etabName }}</label>
            </div>
          </div>
        </fieldset>
        <button type="submit" class="btnSubmit">Changer de structure</button>
      </form>
    </div>
  </div>
</template>

<style>
.current {
  align-self: flex-start;
  font-size: 15px;
  margin-bottom: 15px;
}

fieldset {
  padding: 0;
  margin: 0;
  border: 0;
}

legend {
  padding: 0;
  font-size: 18px;
  border-bottom: 1px solid #e5e5e5;
}
.list-struct {
  height: 250px;
  overflow-y: scroll;
}
.struct {
  padding-top: 12px;
}
.modal-header {
  width: 100%;
  display: flex;
}

.formChange {
  align-self: flex-start;
}

h1 {
  font-size: 20px;
}

.modal {
  position: fixed;
  float: left;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 650px;
  padding: 20px;
  border-radius: 8px;
  bottom: 10%;
  max-width: 90%;
  /* height: 500px; */
}

.btnClose {
  border: 0;
  opacity: 0.4;
  background: #d0d0d0;
  font-weight: bold;
  line-height: 1;
  padding-right: 8px;
  padding-left: 8px;
  border-radius: 100%;
  height: 25px;
  cursor: pointer;
  margin-left: auto;
}

.btnSubmit {
  padding: 7px;
  width: 28%;
  border-radius: 5px;
  background-color: var(--param-etab-button-background-color, #25b2f3);
  color: var(--param-etab-button-text-color, #ffffff);
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 15px;
  border: transparent;
  font-size: 15px;
}
</style>
