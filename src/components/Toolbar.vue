<template>
  <div class="editor-toolbar" :class="toolbarClasses" v-if="this.editor">

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

      <!-- LINK -->
      <li v-if="this.extensions.includes('link')"
          class="image-item"
          :title="translate('toolbar.link.title',this.locale)"
          @click="openLinkModal"
      >
        <font-awesome-icon :icon="['fas', 'link']"/>
      </li>
      <!-- -->

      <!-- INSERT MENU -->
      <li v-if="this.extensions.includes('image') || this.extensions.includes('youtube')"
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
            <li v-if="displayMediaLibrary"
                class="image-item"
                @click="$emit('showMediaLibrary')"
                :title="translate('toolbar.image.media',this.locale)">
              <font-awesome-icon :icon="['fas', 'photo-film']"/>
              <span>{{ translate('toolbar.image.media',this.locale) }}</span>
            </li>
            <li v-if="this.extensions.includes('youtube')"
                class="image-item"
                @click="openYoutubeModal"
                :title="translate('toolbar.image.youtube',this.locale)">
              <font-awesome-icon :icon="['fas', 'film']"/>
              <span>{{ translate('toolbar.image.youtube',this.locale) }}</span>
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

      <!-- VIDEO MODAL -->
      <modal v-if="videoModal" class="insert-video" name="insert-video" :resizable="true" :draggable="true" :click-to-close="false" width="40%">
        <div class="insert-video--modal-head">
          <div class="insert-video--modal-head-title">
            <h2 style="margin-top: 0">{{ translate('toolbar.video.modal_title', this.locale) }}</h2>
            <font-awesome-icon :icon="['fas', 'xmark']" :title="translate('modal.close', this.locale)" @click="videoModal = false"/>
          </div>
        </div>
        <div class="insert-video--modal-content">
          <div class="insert-video--input">
            <label for="video-url">{{ translate('toolbar.video.url',this.locale) }}</label>
            <input type="text" id="video-url" v-model="videoUrl" placeholder="https://youtube.com">
          </div>

          <div class="insert-video--button">
            <button @click="editor.commands.setYoutubeVideo({src: videoUrl,width: 400,height: 300,});videoModal = false">{{ translate('toolbar.image.url_insert',this.locale) }}</button>
          </div>
        </div>
      </modal>
      <!-- -->

      <!-- LINK MODAL -->
      <modal v-if="linkModal" class="insert-link" name="insert-link" :resizable="true" :draggable="true" :click-to-close="false" width="40%">
        <div class="insert-link--modal-head">
          <div class="insert-link--modal-head-title">
            <h2 style="margin-top: 0">{{ translate('toolbar.link.modal_title', this.locale) }}</h2>
            <font-awesome-icon :icon="['fas', 'xmark']" :title="translate('modal.close', this.locale)" @click="linkModal = false"/>
          </div>
        </div>
        <div class="insert-link--modal-content">
          <div class="insert-link--input">
            <label for="link-url">{{ translate('toolbar.link.url',this.locale) }}</label>
            <input type="text" id="link-url" v-model="linkUrl" placeholder="https://example.com">
          </div>

          <div class="insert-link--button">
            <button @click="editor.chain().focus().extendMarkRange('link').setLink({href: linkUrl}).run();linkModal = false">{{ translate('toolbar.image.url_insert',this.locale) }}</button>
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

      <!-- TABLE -->
      <li v-if="this.extensions.includes('table') && !editor?.isActive('table')"
          @click="openTableModal">
        <font-awesome-icon :icon="['fas', 'table']"/>
      </li>

      <template v-if="this.extensions.includes('link') && editor?.isActive('link')">
        <li class="editor-separator"></li>
        <li @click="editor.chain().focus().extendMarkRange('link').unsetLink().run()">
          <font-awesome-icon :icon="['fas', 'link-slash']"/>
        </li>
      </template>

      <template v-if="this.extensions.includes('table') && editor?.isActive('table')">
        <li class="editor-separator"></li>
        <li @click="editor?.commands.deleteTable()" :title="translate('toolbar.table.delete', this.locale)">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="currentColor"
          >
            <path
                d="M15.46,15.88L16.88,14.46L19,16.59L21.12,14.46L22.54,15.88L20.41,18L22.54,20.12L21.12,21.54L19,19.41L16.88,21.54L15.46,20.12L17.59,18L15.46,15.88M4,3H18A2,2 0 0,1 20,5V12.08C18.45,11.82 16.92,12.18 15.68,13H12V17H13.08C12.97,17.68 12.97,18.35 13.08,19H4A2,2 0 0,1 2,17V5A2,2 0 0,1 4,3M4,7V11H10V7H4M12,7V11H18V7H12M4,13V17H10V13H4Z"
            />
          </svg>
        </li>
        <li @click="editor?.commands.addColumnBefore()" :title="translate('toolbar.table.add_column_before', this.locale)">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="currentColor"
          >
            <path
                d="M13,2A2,2 0 0,0 11,4V20A2,2 0 0,0 13,22H22V2H13M20,10V14H13V10H20M20,16V20H13V16H20M20,4V8H13V4H20M9,11H6V8H4V11H1V13H4V16H6V13H9V11Z"
            />
          </svg>
        </li>
        <li @click="editor?.commands.addColumnAfter()" :title="translate('toolbar.table.add_column_after', this.locale)">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="currentColor"
          >
            <path
                d="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z"
            />
          </svg>
        </li>
        <li @click="editor?.commands.deleteColumn()" :title="translate('toolbar.table.delete_column', this.locale)">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="currentColor"
          >
            <path
                d="M4,2H11A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M17.59,12L15,9.41L16.41,8L19,10.59L21.59,8L23,9.41L20.41,12L23,14.59L21.59,16L19,13.41L16.41,16L15,14.59L17.59,12Z"
            />
          </svg>
        </li>
        <li @click="editor?.commands.addRowBefore()" :title="translate('toolbar.table.add_row_before', this.locale)">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="currentColor"
          >
            <path
                d="M22,14A2,2 0 0,0 20,12H4A2,2 0 0,0 2,14V21H4V19H8V21H10V19H14V21H16V19H20V21H22V14M4,14H8V17H4V14M10,14H14V17H10V14M20,14V17H16V14H20M11,10H13V7H16V5H13V2H11V5H8V7H11V10Z"
            />
          </svg>
        </li>
        <li @click="editor?.commands.addRowAfter()" :title="translate('toolbar.table.add_row_after', this.locale)">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="currentColor"
          >
            <path
                d="M22,10A2,2 0 0,1 20,12H4A2,2 0 0,1 2,10V3H4V5H8V3H10V5H14V3H16V5H20V3H22V10M4,10H8V7H4V10M10,10H14V7H10V10M20,10V7H16V10H20M11,14H13V17H16V19H13V22H11V19H8V17H11V14Z"
            />
          </svg>
        </li>
        <li @click="editor?.commands.deleteRow()" :title="translate('toolbar.table.delete_row', this.locale)">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="currentColor"
          >
            <path
                d="M9.41,13L12,15.59L14.59,13L16,14.41L13.41,17L16,19.59L14.59,21L12,18.41L9.41,21L8,19.59L10.59,17L8,14.41L9.41,13M22,9A2,2 0 0,1 20,11H4A2,2 0 0,1 2,9V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V9M4,9H8V6H4V9M10,9H14V6H10V9M16,9H20V6H16V9Z"
            />
          </svg>
        </li>
        <li @click="editor?.commands.mergeOrSplit()" :title="translate('toolbar.table.merge_or_split', this.locale)">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="currentColor"
          >
            <path
                d="M5,10H3V4H11V6H5V10M19,18H13V20H21V14H19V18M5,18V14H3V20H11V18H5M21,4H13V6H19V10H21V4M8,13V15L11,12L8,9V11H3V13H8M16,11V9L13,12L16,15V13H21V11H16Z"
            />
          </svg>
        </li>
      </template>

      <!-- TABLE MODAL -->
      <modal v-if="tableModal" class="insert-table" name="insert-table" :resizable="true" :draggable="true" :click-to-close="false" width="40%">
        <div class="insert-table--modal-head">
          <div class="insert-table--modal-head-title">
            <h2 style="margin-top: 0">{{ translate('toolbar.table.modal_title', this.locale) }}</h2>
            <font-awesome-icon :icon="['fas', 'xmark']" :title="translate('modal.close', this.locale)" @click="tableModal = false"/>
          </div>
        </div>
        <div class="insert-table--modal-content">
          <div class="insert-table--inputs">
            <div class="insert-table--input">
              <label for="table-columns">{{ translate('toolbar.table.columns',this.locale) }}</label>
              <input type="text" id="table-columns" v-model="tableColumns" placeholder="3">
            </div>
            <div class="insert-table--input">
              <label for="table-rows">{{ translate('toolbar.table.rows',this.locale) }}</label>
              <input type="text" id="table-rows" v-model="tableRows" placeholder="3">
            </div>
          </div>

          <div class="insert-table--input-header">
            <input type="checkbox" id="table-header" v-model="tableHeader">
            <label for="table-header">{{ translate('toolbar.table.header',this.locale) }}</label>
          </div>

          <div class="insert-table--button">
            <button @click="editor.chain().focus().insertTable({ rows: tableRows, cols: tableColumns, withHeaderRow: tableHeader }).run();tableModal = false">{{ translate('toolbar.image.url_insert',this.locale) }}</button>
          </div>
        </div>

      </modal>
      <!-- -->
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

      // Image
      imageModal: false,
      imageMethod: 'import',
      imageImported: null,

      // Table
      tableModal: false,
      tableColumns: 3,
      tableRows: 3,
      tableHeader: true,

      // Video
      videoModal: false,
      videoUrl: '',

      // Link
      linkModal: false,
      linkUrl: ''
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

    openYoutubeModal() {
      this.videoModal = true;
    },

    openTableModal() {
      this.tableModal = true;
    },

    openLinkModal() {
      this.linkModal = true;
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
