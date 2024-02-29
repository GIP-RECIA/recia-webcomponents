<script setup lang="ts">
import { uploadLogo } from '@/services/serviceParametab';
import { showError } from '@/utils/errorUtils';
import Cropper from 'cropperjs';
import Swal from 'sweetalert2';
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const m = (key: string): string => t(`image-cropper.${key}`);

const props = defineProps<{
  imageUrl: string | null;
  idEtab: string | undefined;
  detailEtab: string;
  paramEtabApi: string;
  userInfoApiUrl: string;
}>();

const imageInput = ref<any>(null);
const selectedFile = ref<any>(null);
const imageSrc = ref<string | ArrayBuffer | null>();
const img = ref<any>(null);
const fileReader = new FileReader();
const open = ref<boolean>(false);
const prevImg = ref<any>(null);
let cropper: any = null;
let imageEtab = ref<string | null>(props.imageUrl);

watch(
  () => props.imageUrl,
  () => {
    imageEtab.value = props.imageUrl;
  },
);

fileReader.onload = (event: ProgressEvent<FileReader>) => {
  imageSrc.value = event?.target?.result;
};

const fileChanged = (e: any) => {
  const files = e.target.files || e.dataTransfer.files;
  if (files.length) {
    selectedFile.value = files[0];
  }
};

onMounted(() => {
  if (img.value) {
    cropper = new Cropper(img.value, {
      aspectRatio: 270 / 120,
      viewMode: 2,
      background: false,
      preview: '#previewImg',
    });
  }
});

onUnmounted(() => {
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
});

watchEffect(() => {
  if (selectedFile.value) {
    fileReader.readAsDataURL(selectedFile.value);
  } else {
    imageSrc.value = null;
  }

  // set image par defaut if structLogo is null
  // if (props.detailEtab.structLogo == null) {
  //   props.detailEtab.structLogo = "/src/assets/flower.jpg";
  // }
});

watch(
  imageSrc,
  () => {
    if (imageSrc.value && img.value) {
      if (cropper) {
        cropper.replace(imageSrc.value);
      } else {
        cropper = new Cropper(img.value, {
          aspectRatio: 270 / 120,
          viewMode: 2,
          background: false,
          zoomable: true,
          preview: prevImg.value,
        });
      }
    }
  },
  {
    flush: 'post',
  },
);

const closeModal = () => {
  open.value = false;
  selectedFile.value = null;
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
};

const cropImage = () => {
  cropper.getCroppedCanvas().toBlob(async (blob: any) => {
    const formData = new FormData();

    // append DTO as JSON string
    formData.append('details', props.detailEtab);

    // add name for the image
    formData.append('name', 'image-name-' + new Date().getTime());

    // append image file
    formData.append('file', blob, 'logo.' + blob.type.split('/')[1]);

    try {
      const response = await uploadLogo(
        props.paramEtabApi + `/logoupload/${props.idEtab}`,
        formData,
        props.userInfoApiUrl,
      );

      // Assuming the response from the server contains the URL of the uploaded image
      imageEtab.value = response.data;

      closeModal();
      Swal.fire({
        title: 'Sauvegardé',
        icon: 'success',
      });
    } catch (error) {
      closeModal();
      showError(error.response.data);
    }
  }, 'image/jpeg');
};
</script>

<template>
  <div class="avatar-upload" v-bind="$attrs">
    <div class="avatar-edit">
      <input
        ref="imageInput"
        type="file"
        accept=".jpg, .jpeg, .png"
        :style="{ display: 'none' }"
        @change="fileChanged"
      />
      <button class="edit-logo" @click="open = true"></button>
    </div>
    <div class="avatar-preview">
      <img class="imagePreview" :src="imageEtab" alt="" width="270" height="120" />
    </div>
  </div>

  <!-- Modal -->

  <div v-if="open" class="modal">
    <input id="idEtab" type="hidden" name="idEtab" :value="idEtab" />
    <div>
      <div class="close">
        <button type="button" class="close" @click="closeModal">x</button>
      </div>
      <div class="images">
        <div v-show="imageSrc" class="cropImg">
          <img ref="img" :src="imageSrc" alt="" width="280" />
        </div>
        <div class="previewImg">
          <div ref="prevImg" id="previewImg">
            <img :src="imageEtab" alt="" width="270" height="120" />
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="btn-selectImg" @click="imageInput.click()">
          {{ m('selectionner-image') }}
        </button>
        <button v-show="imageSrc" class="btn-cropImg" @click="cropImage">
          {{ m('appliquer') }}
        </button>
        <button class="btn-close" @click="closeModal">
          {{ m('fermer') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import 'cropperjs/dist/cropper.css';
.btn-selectImg,
.btn-cropImg,
.btn-close {
  padding: 5px;
  cursor: pointer;
}

.buttons > button {
  margin-right: 5px;
}

.cropImg {
  flex: 1;
  padding-right: 10px;
}

.previewImg {
  flex: 1;
  margin: auto;
}

#previewImg {
  width: 270px;
  height: 120px;
  overflow: hidden;
  margin: auto;
  border: 0 solid #eee;
  border-radius: 4px;
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
  width: 550px;
  padding: 20px;
  border-radius: 8px;
  bottom: 10%;
  max-width: 90%;
}

.close {
  margin-left: auto;
  cursor: pointer;
}

button.close {
  border: 0;
  opacity: 0.4;
  /* background: transparent; */
  background: darkgrey;
  font-weight: bold;
  line-height: 1;
  padding-right: 8px;
  padding-left: 8px;
  border-radius: 100%;
  height: 20px;
}

.buttons {
  margin: 15px;
}

.images {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  overflow: hidden;
}

.image {
  flex: 1 30%;
  text-align: center;
}

.image-preview {
  border: 1px solid black;
  background-color: #fff;
  max-width: 120px;
  max-height: 120px;
  border-radius: 3px;
  position: relative;
}

.avatar-upload {
  position: relative;
  /* max-width: 205px;
  margin: 50px auto; */
  flex: 1 20%;
  text-align: center;

  .avatar-edit {
    position: absolute;
    z-index: 1;
    top: calc(50% - 70px);
    right: calc(50% - 65px - 80px); /* adjust the 60px value as needed */
  }

  .avatar-edit input {
    display: none;
  }

  .avatar-edit input + .edit-logo {
    display: inline-block;
    width: 34px;
    height: 34px;
    margin-bottom: 0;
    border-radius: 100%;
    background: #ffffff;
    border: 1px solid transparent;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.18);
    cursor: pointer;
    font-weight: normal;
    transition: all 0.2s ease-in-out;
  }

  .avatar-edit input + .edit-logo:hover {
    background: #f1f1f1;
    border-color: #d6d6d6;
  }

  .avatar-edit input + .edit-logo:after {
    content: '\f040';
    font-family: 'FontAwesome';
    color: #757575;
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
  }

  .imagePreview {
    /* width: auto;
    height: auto; */
    position: relative;
    border: 3px solid #eef0f8;
    box-shadow: 0px 0.5px 2.5px 1px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
  }

  .avatar-preview > div {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}

.clipper {
  height: 100%;
  width: 100%;
  max-height: 300px;
  max-width: 400px;
}

.cropper {
  margin-top: 50px;
  height: 600px;
  width: 600px;
  background: #ddd;
}
</style>
