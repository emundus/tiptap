<template>
  <modal class="media-library" name="edit" :resizable="true" :draggable="true" :click-to-close="false" @closed="closeModal" width="70em" height="90vh">
    <div class="media-library--modal-head">
      <div class="media-library--modal-head-title">
        <h1 style="margin-top: 0">{{ translate('mediaLibrary.title', this.locale) }}</h1>
        <span :title="translate('modal.close', this.locale)" class="material-symbols-outlined" @click="$emit('closeMediaLibrary')">close</span>
      </div>
    </div>
    <div class="media-library--modal-content">
      <div class="media-library--file-explorer">
        <div class="media-library--file-explorer-filters">
          <h3 style="margin-bottom: 0;margin-top: 0">
            <template v-if="computedMedias.length > 1">
              {{ computedMedias.length + ' ' + translate('mediaLibrary.files', this.locale) }}
            </template>
            <template v-else>
              {{ computedMedias.length + ' ' + translate('mediaLibrary.file', this.locale) }}
            </template>
          </h3>
          <input type="text" class="media-library--searchbar" v-model="search" :placeholder="translate('mediaLibrary.search.placeholder', this.locale)" />
        </div>
        <div class="media-library--file-explorer-files">
          <div class="media-library--file" :class="current_media.name === media.name ? 'media-library--selected' : ''" v-for="media in computedMedias" :key="media.name" @click="current_media = media">
            <div>
              <img :src="media.url" :alt="media.name" />
              <span class="media-library--file-name">{{ media.name }}</span>
            </div>
            <span class="media-library--file-size" v-if="media.size">{{ readableFileSize(media.size) }}</span>
          </div>
        </div>
      </div>

      <div class="media-library--file-preview">
        <div class="media-library--file-preview-image">
          <img :src="current_media.url" :alt="current_media.name" />
        </div>

        <div class="media-library--informations">
          <h2 class="media-library--file-name">{{ current_media.name }}</h2>
          <span class="media-library--file-size" v-if="current_media.size">{{ readableFileSize(current_media.size) }}</span>
          <div v-if="current_media.attributes">
            <h3 style="margin-bottom: 0">{{ translate('mediaLibrary.attributes.title', this.locale) }}</h3>
            <hr/>
            <div class="media-library--attributes">
              <div v-for="attribute in current_media.attributes">
                <div class="media-library--attribute">
                  <span class="media-library--attribute-name">{{ translate('mediaLibrary.attributes.' + attribute.name, this.locale) }}</span>
                  <span>{{ attribute.value }}</span>
                </div>
                <hr/>
              </div>
            </div>
          </div>

          <div class="media-library--actions">
            <button type="button" v-if="deleteUrl" @click="deleteFile">
              {{ translate('mediaLibrary.actions.delete.title', this.locale) }}
            </button>
            <button
                type="button"
                class="media-library--actions-insert"
                @click="$emit('insertImage',current_media.url);$emit('closeMediaLibrary');">
              {{ translate('mediaLibrary.actions.insert', this.locale) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/utils/Modal.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import translate from "@/mixins/translate.js";

export default {
  name: "MediaLibrary",
  props: {
    files: {
      type: Array
    },
    deleteUrl: {
      type: String
    },
  },
  components: {
    Modal,
    FontAwesomeIcon
  },
  mixins: [translate],

  inject: ['locale'],

  emits: ['insertImage', 'closeMediaLibrary'],

  data() {
    return {
      medias: [],
      current_media: {},
      search: '',

      locale: this.locale
    }
  },
  created() {
    this.medias = this.files;
    this.current_media = this.medias[0]
  },
  methods: {
    closeModal() {},

    deleteFile() {
      if (confirm(this.translate('mediaLibrary.actions.delete.confirm', this.locale))) {
        fetch(this.deleteUrl+'&file='+this.current_media.name, {
          method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                this.medias = this.medias.filter(media => media.name !== this.current_media.name);
                this.current_media = this.medias[0];
              }
            })
            .catch(error => console.error(error));
      }
    },

    readableFileSize(size) {
      const DEFAULT_SIZE = 0;
      const fileSize = size ?? DEFAULT_SIZE;

      if (!fileSize) {
        return `${DEFAULT_SIZE} kb`;
      }

      const sizeInKb = fileSize / 1024;

      if (sizeInKb > 1024) {
        return `${(sizeInKb / 1024).toFixed(2)} mb`;
      } else {
        return `${sizeInKb.toFixed(2)} kb`;
      }
    }
  },
  computed: {
    computedMedias: function (val) {
      if(this.search) {
        return this.medias.filter(media => media.name.toLowerCase().includes(this.search.toLowerCase()));
      } else {
        return this.medias;
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>