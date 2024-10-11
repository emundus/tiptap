<template>
  <div class="editor-toolbar" :class="toolbarClasses" v-if="this.editor">
    <bubble-menu
        v-if="this.editor.isActive('link')"
        :editor="this.editor"
        :tippy-options="{ duration: 100, theme: 'editor' }"
    >
      <div class="editor-bubble-menu">
        <div>
          <img @error="urlIconNotFound = true" @load="urlIconNotFound = false" v-show="!urlIconNotFound"
               :src="this.editor.getAttributes('link').href+'/favicon.ico'" alt="favicon" width="24" height="24"/>
          <font-awesome-icon v-if="urlIconNotFound" :icon="['fas', 'globe']"/>
        </div>
        <div class="editor-bubble-menu--buttons">
          <button @click.stop.prevent="copyLink(this.editor.getAttributes('link').href)">
            <font-awesome-icon :icon="['fas', 'copy']"/>
          </button>
          <button @click.stop.prevent="setLink">
            <font-awesome-icon :icon="['fas', 'pen-to-square']"/>
          </button>
        </div>
      </div>
    </bubble-menu>

    <ul class="editor-toolbar--list">

      <!-- HISTORY -->
      <li v-if="this.extensions.includes('history')" @click.stop.prevent="this.editor.chain().focus().undo().run()">
        <font-awesome-icon :icon="['fas', 'reply']"/>
      </li>
      <li v-if="this.extensions.includes('history')" @click.stop.prevent="editor.chain().focus().redo().run()">
        <font-awesome-icon :icon="['fas', 'share']"/>
      </li>
      <!-- -->

      <!-- FONTS -->
      <select v-if="this.extensions.includes('fontFamily')" v-model="fontFamily">
        <option
            v-for="family in fontFamilies"
            :key="family"
            :value="family"
        >
          {{ family }}
        </option>
      </select>
      <select v-if="this.extensions.includes('fontSize')" v-model="fontSize">
        <option
            v-for="size in fontSizes"
            :key="size"
            :value="size"
        >
          {{ size }}
        </option>
      </select>
      <select v-model="heading"
              v-if="this.extensions.includes('h1') || this.extensions.includes('h2') || this.extensions.includes('h3')">
        <option :key="0" :value="0">{{ translate('toolbar.headings.normal', this.locale) }}</option>
        <option v-for="level in headingLevels" :key="level" :value="level">
          {{ translate('toolbar.headings.h' + level, this.locale) }}
        </option>
      </select>
      <!-- -->

      <!-- ALIGNMENTS -->
      <li v-if="this.extensions.includes('left')"
          :title="translate('toolbar.align.left',this.locale)"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          @click.stop.prevent="setTextAlign('left')"
      >
        <font-awesome-icon :icon="['fas', 'align-left']"/>
      </li>

      <li v-if="this.extensions.includes('center')"
          :title="translate('toolbar.align.center',this.locale)"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          @click.stop.prevent="setTextAlign('center')"
      >
        <font-awesome-icon :icon="['fas', 'align-center']"/>
      </li>
      <li v-if="this.extensions.includes('right')"
          :title="translate('toolbar.align.right',this.locale)"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          @click.stop.prevent="setTextAlign('right')"
      >
        <font-awesome-icon :icon="['fas', 'align-right']"/>
      </li>
      <li v-if="this.extensions.includes('justify')"
          :title="translate('toolbar.align.justify',this.locale)"
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
          class="menubar__button"
          @click.stop.prevent="setTextAlign('justify')"
      >
        <font-awesome-icon :icon="['fas', 'align-justify']"/>
      </li>
      <li v-if="this.extensions.includes('ul')"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          :title="translate('toolbar.list.bullet',this.locale)"
          @click.stop.prevent="editor.chain().focus().toggleBulletList().run()"
      >
        <font-awesome-icon :icon="['fas', 'list-ul']"/>
      </li>
      <li v-if="this.extensions.includes('ol')"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          :title="translate('toolbar.list.ordered',this.locale)"
          @click.stop.prevent="editor.chain().focus().toggleOrderedList().run()"
      >
        <font-awesome-icon :icon="['fas', 'list-ol']"/>
      </li>
      <!-- -->

      <!-- COLOR -->
      <li v-if="this.extensions.includes('color')"
          :title="translate('toolbar.textColor',this.locale)"
          class="editor-color-picker"
      >
        <popover :icon="'fa-fill-drip'">
          <div
              class="editor-color-picker--popover">
            <span
                v-for="color of colors"
                @click="setColor(color.value)"
                :style="{ backgroundColor: color.value, border: '1px solid grey', margin: '2px' }">
            </span>
          </div>
        </popover>
      </li>
      <!-- -->

      <!-- INSERT MENU -->
      <li v-if="this.extensions.includes('image') || this.extensions.includes('link')"
          :title="translate('toolbar.insert',this.locale)"
          class="editor-image">
        <popover :text="translate('toolbar.insert',this.locale)">
          <ul class="editor-image--popover">
            <li v-if="this.extensions.includes('image')"
                class="image-item"
                @click="openImageModal">
              <font-awesome-icon :icon="['fas', 'upload']"/>
              <span>{{ translate('toolbar.image.title',this.locale) }}</span>
            </li>
            <li v-if="this.extensions.includes('link')"
                class="image-item"
                :title="translate('toolbar.link',this.locale)"
                @click.stop.prevent="setLink"
            >
              <font-awesome-icon :icon="['fas', 'link']"/>
              <span>{{ translate('toolbar.link',this.locale) }}</span>
            </li>
            <li v-if="displayMediaLibrary"
                class="image-item"
                @click="$emit('showMediaLibrary')"
                :title="translate('toolbar.image.media',this.locale)">
              <font-awesome-icon :icon="['fas', 'photo-film']"/>
              <span>{{ translate('toolbar.image.media',this.locale) }}</span>
            </li>
          </ul>
        </popover>
      </li>

      <!-- IMAGE MODAL -->
      <modal v-if="imageModal" class="insert-image" name="insert-image" :resizable="true" :draggable="true" :click-to-close="false" width="40%">
        <div class="insert-image--modal-head">
          <div class="insert-image--modal-head-title">
            <h2 style="margin-top: 0">{{ translate('toolbar.image.modal_title', this.locale) }}</h2>
            <font-awesome-icon :icon="['fas', 'xmark']" :title="translate('modal.close', this.locale)" @click="imageModal = false"/>
          </div>
        </div>
        <div class="insert-image--modal-content">
          <ul>
            <li class="image-item"
                :class="imageMethod === 'import' ? 'active' : ''"
                @click="imageMethod = 'import'">
              <span>{{ translate('toolbar.image.import',this.locale) }}</span>
            </li>
            <li class="image-item"
                :class="imageMethod === 'url' ? 'active' : ''"
                @click="imageMethod = 'url'">
              <span>{{ translate('toolbar.image.url',this.locale) }}</span>
            </li>
          </ul>

          <div class="insert-image--import-file" v-if="imageMethod === 'import'">
            <input type="file" id="import_file" accept="image/*" style="display:none" @change="$emit('importImage',$event);imageModal = false">
            <div class="insert-image--import-file-dz" @click="importFromComputer">
                <div>
                  <span>{{ translate('toolbar.image.import_drag',this.locale) }} <u>{{ translate('toolbar.image.import_download',this.locale) }}</u></span>
                  <font-awesome-icon :icon="['fas', 'cloud-arrow-up']"/>
                </div>
            </div>
          </div>

          <div class="insert-image--from-url" v-if="imageMethod === 'url'">
            <label for="image-url">{{ translate('toolbar.image.url_title',this.locale) }}</label>
            <input type="text" id="image-url" v-model="imageImported" placeholder="https://example.com/image.jpg">

            <div class="insert-image--from-url-button">
              <button @click="editor.chain().focus().setImage({src: imageImported}).run();imageImported = null;imageModal = false">{{ translate('toolbar.image.url_insert',this.locale) }}</button>
            </div>
          </div>
        </div>
      </modal>
      <!-- -->

      <!-- FORMAT MENU -->
      <li v-if="this.extensions.includes('bold') || this.extensions.includes('italic') || this.extensions.includes('underline') || this.extensions.includes('strike') || this.extensions.includes('highlight') || this.extensions.includes('codeblock')"
          :title="translate('toolbar.format',this.locale)"
          class="editor-image">
        <popover :text="translate('toolbar.format',this.locale)">
          <ul class="editor-image--popover">
            <li v-if="this.extensions.includes('bold')"
                class="image-item"
                :title="translate('toolbar.bold',this.locale)"
                @click.stop.prevent="editor.chain().focus().toggleBold().run()">
              <font-awesome-icon :icon="['fas', 'bold']"/>
              <span>{{ translate('toolbar.bold',this.locale) }}</span>
            </li>
            <li v-if="this.extensions.includes('italic')"
                class="image-item"
                :title="translate('toolbar.italic',this.locale)"
                @click.stop.prevent="editor.chain().focus().toggleItalic().run()"
            >
              <font-awesome-icon :icon="['fas', 'italic']"/>
              <span>{{ translate('toolbar.italic',this.locale) }}</span>
            </li>
            <li v-if="this.extensions.includes('underline')"
                class="image-item"
                :title="translate('toolbar.underline',this.locale)"
                @click.stop.prevent="editor.chain().focus().toggleUnderline().run()"
            >
              <font-awesome-icon :icon="['fas', 'underline']"/>
              <span>{{ translate('toolbar.underline',this.locale) }}</span>
            </li>
            <li v-if="this.extensions.includes('strike')"
                class="image-item"
                :title="translate('toolbar.strike',this.locale)"
                @click.stop.prevent="editor.chain().focus().toggleStrike().run()"
            >
              <font-awesome-icon :icon="['fas', 'text-slash']"/>
              <span>{{ translate('toolbar.strike',this.locale) }}</span>
            </li>
            <li v-if="this.extensions.includes('highlight')"
                class="image-item"
                :title="translate('toolbar.highlight',this.locale)"
                @click.stop.prevent="editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()"
            >
              <font-awesome-icon :icon="['fas', 'highlighter']"/>
              <span>{{ translate('toolbar.highlight',this.locale) }}</span>
            </li>
            <li v-if="this.extensions.includes('codeblock')"
                class="image-item"
                :title="translate('toolbar.codeblock',this.locale)"
                @click.stop.prevent="editor.chain().focus().toggleCodeBlock().run()"
            >
              <font-awesome-icon :icon="['fas', 'code']"/>
              <span>Code</span>
            </li>
          </ul>
        </popover>
      </li>
      <!-- -->

      <li v-if="this.extensions.includes('table')"
          @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
        <font-awesome-icon :icon="['fas', 'table']"/>
      </li>
    </ul>
  </div>
</template>

<script>
import {Editor, BubbleMenu} from "@tiptap/vue-3";
import translate from "@/mixins/translate.js";

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import Popover from "@/components/utils/Popover.vue";
import Modal from "@/components/utils/Modal.vue";

export default {
  name: "Toolbar",
  components: {
    Modal,
    Popover,
    FontAwesomeIcon,
    BubbleMenu
  },
  mixins: [translate],

  props: {
    editorProp: {
      type: Editor,
      required: true,
    },
    // Extensions to display in the toolbar
    extensions: {
      type: Array,
      required: true,
    },
    displayMediaLibrary: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  inject: ['locale'],

  emits: ['importImage','showMediaLibrary'],

  data() {
    return {
      heading: 0,
      fontFamily: 'Arial',
      fontSize: '16px',
      color: "#000",
      lineHeight: 1.15,
      imageImported: null,

      // Extensions values
      fontSizes: [
        '8px',
        '10px',
        '12px',
        '14px',
        '16px',
        '18px',
        '20px',
        '24px'
      ],
      lineHeights: [
        {
          label: "1.15",
          value: 1.15,
        },
        {
          label: "1.50",
          value: 1.50,
        },
        {
          label: "Double",
          value: 3.0,
        },
      ],

      editor: undefined,
      locale: this.locale,
      urlIconNotFound: false,

      imageModal: false,
      imageMethod: 'import'
    }
  },

  watch: {
    // Extensions
    heading: {
      handler(value) {
        this.triggerHeading(value)
      }
    },
    fontFamily: {
      handler(newValue) {
        this.setFontFamily(newValue)
      },
    },
    fontSize: {
      handler(newValue) {
        this.setFontSize(newValue)
      },
    },
    color: {
      handler(newValue) {
        this.setColor(newValue)
      },
    },
  },

  mounted() {
    this.editor = this.editorProp
  },

  beforeUnmount() {
  },

  methods: {
    triggerHeading(level) {
      const levelIsValid = level >= 1 && level <= 3 // Level 4 does not exist and thus sets the text back to simple paragraph. This is great to clear heading
      this.editor.chain().focus().toggleHeading({level: levelIsValid ? level : 4}).run()
    },

    setFontFamily(font) {
      this.editor.chain().focus().setFontFamily(font).run()
    },

    setFontSize(size) {
      this.editor.chain().focus().setFontSize(size).run()
    },

    setColor(color) {
      this.editor.chain().focus().setColor(color).run();
    },

    setTextAlign(value) {
      this.editor.chain().focus().setTextAlign(value).run();
      this.editor.chain().focus().setImgPosition(value).run();
      this.editor.chain().focus().setFilePosition(value).run();
      this.editor.chain().focus().setVideoPosition(value).run();
    },

    setLink() {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        this.editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .unsetLink()
            .run()

        return
      }

      // update link
      this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({href: url})
          .run()
    },

    openImageModal() {
      this.imageModal = true;
    },

    importFromUrl() {
      const url = window.prompt('URL');

      // cancelled
      if (url === null) {
        return
      }

      this.editor.chain().focus().setImage({src: url}).run();
    },

    importFromComputer() {
      document.getElementById("import_file").click();
    },

    copyLink(url) {
      navigator.clipboard.writeText(url)
    },
  },

  computed: {
    headingLevels() {
      var levels = [];
      if (this.extensions.includes('h1')) levels.push(1);
      if (this.extensions.includes('h2')) levels.push(2);
      if (this.extensions.includes('h3')) levels.push(3);
      return levels;
    },

    displaySeparator() {
      return this.extensions.includes('left') || this.extensions.includes('center') || this.extensions.includes('right') || this.extensions.includes('justify') || this.extensions.includes('ul') || this.extensions.includes('ol') || this.extensions.includes('table');
    },

    toolbarClasses() {
      if (this.$attrs.toolbar_classes === undefined) return '';
      return this.$attrs.toolbar_classes;
    },

    colors() {
      if (this.$attrs.palette === undefined) return '';
      return this.$attrs.palette;
    },

    fontFamilies() {
      if (this.$attrs.font_families === undefined) return '';
      return this.$attrs.font_families;
    }
  }
}
</script>
