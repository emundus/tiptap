<template>
  <div :class="wrapperClasses" v-if="this.editor">
    <toolbar
        @importImage="importImage"
        @showMediaLibrary="showMediaLibrary = true"
        :editor-prop="this.editor"
        :extensions="pluginsDisplayed"
        :display-media-library="displayMediaLibrary"
        v-bind:toolbar_classes="toolbarClasses"
        v-bind:palette="palette"
        v-bind:font_families="fontFamilies"
    />
    <div class="editor-content" :class="editorContentClasses" :style="{ 'height': this.editorContentHeight }">
      <editor-content @paste="pasteEventHandler" :editor="editor" :style="{height: '100%'}"/>
    </div>
    <media-library
        v-if="showMediaLibrary"
        :files="mediaFiles"
        :delete-url="deleteMediaUrl"
        @closeMediaLibrary="showMediaLibrary = false"
        @insertImage="insertImage"
    />
  </div>
</template>

<script>
import {Editor, EditorContent} from "@tiptap/vue-3";
import Toolbar from "@/components/Toolbar.vue";
import translate from "@/mixins/translate.js";

// Extensions
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import HardBreak from '@tiptap/extension-hard-break'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import CodeBlock from '@tiptap/extension-code-block'
import Heading from '@tiptap/extension-heading'
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "tiptap-extension-font-size";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image';
import Mention from '@tiptap/extension-mention'
import Placeholder from "@tiptap/extension-placeholder";
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import Blockquote from '@tiptap/extension-blockquote'
import History from '@tiptap/extension-history'
import Dropcursor from '@tiptap/extension-dropcursor'
import Youtube from '@tiptap/extension-youtube'

import {getSuggestion} from './plugins/mentions/suggestion.js'
import defaultColors from './plugins/colors/default.js'
import MediaLibrary from "@/components/plugins/media_library/MediaLibrary.vue";
import { Panel } from './plugins/panel/panel.js'

const options = [
  "bold",
  "italic",
  "strike",
  "underline",
  "h1",
  "h2",
  "h3",
  "link",
  //"hr",
  "codeblock",
  "image",
  "ul",
  "ol",
  "left",
  "center",
  "right",
  "justify",
  "blockquote",
  "history",
  "table",
  "color",
  "fontFamily",
  "fontSize",
  "highlight",
  "youtube",
  "panel"
];

// Main editor component
export default {
  name: 'TipTapEditor',
  components: {
    MediaLibrary,
    Toolbar,
    EditorContent
  },

  mixins: [translate],

  props: {
    modelValue: {
      type: String,
      default: '',
    },
    // Locale language for the editor (en, fr)
    locale: {
      type: String,
      default: 'en',
      required: true,

      validator: (value) => {
        return [
          'en',
          'fr'
        ].includes(value)
      }
    },
    // Output format for the editor (html, json)
    outputFormat: {
      type: String,
      default: 'html',

      validator: (value) => {
        return [
          'html',
          'json'
        ].includes(value)
      }
    },
    // Upload URL for images
    uploadUrl: {
      type: String,
      default: ''
    },
    deleteMediaUrl: {
      type: String,
      default: ''
    },
    // Suggestions for the mention plugin
    suggestions: {
      type: Array,
      required: false,
      default: () => [],
    },
    // Class for the mention suggestions
    suggestionsClass: {
      type: String,
      default: 'mention',
    },
    // Preset for the toolbar (basic, full or custom). If custom, you need to provide the plugins
    preset: {
      type: String,
      default: 'basic',
      required: true,

      validator: (value) => {
        return [
          'basic',
          'full',
          'custom'
        ].includes(value)
      }
    },
    // Plugins for the toolbar
    plugins: {
      type: Array,
      required: false,
      default: () => [],
      validator: (val) =>
          val.every(
              (valItem) => typeof valItem === "string" && options.includes(valItem)
          ),
    },
    // Placeholder for the editor
    placeholder: {
      type: String,
      required: false,
      default() {
        return 'placeholder.default';
      },
    },
    // Palette colors for the editor
    palette: {
      type: Array,
      required: false,
      default: () => defaultColors,
      validator: (val) =>
          val.every(
              (valItem) => typeof valItem === "object"
          ),
    },
    // Font families for the editor
    fontFamilies: {
      type: Array,
      required: false,
      default: () => [
        'Arial',
        'Calibri',
        'Helvetica',
        'Times New Roman',
        'Comic Sans MS',
        'Caveat'
      ],
    },
    mediaFiles: {
      type: Array,
      required: false,
      default: () => [],
    },
    wrapperClasses: {
      type: Array,
      default: () => ['editor-wrapper'],
    },
    // Class for the toolbar
    toolbarClasses: {
      type: Array
    },
    // Class for the editor content
    editorContentClasses: {
      type: Array
    },
    editorContentHeight: {
      type: String,
      default: 'auto'
    }
  },

  emits: ['update:modelValue','uploadedImage'],

  data() {
    return {
      editor: undefined,
      extensions: [],
      pluginsDisplayed: [],

      displayMediaLibrary: false,
      showMediaLibrary: false,
    }
  },

  provide() {
    // use function syntax so that we can access `this`
    return {
      locale: this.$props.locale
    }
  },

  watch: {
    modelValue(value) {
      // HTML
      var isSame = this.editor.getHTML() === value
      if (this.$props.outputFormat === 'json') {
        isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)
      }

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },

    // Extensions
    suggestions(value) {
      if (!this.editor) {
        return;
      }
      this.editor.setOptions({suggestions: value});
    },
  },

  mounted() {
    if(this.$props.mediaFiles.length > 0) {
      this.displayMediaLibrary = true;
    }

    this.getPluginsDisplayed();
    this.getEditorExtensions();

    this.editor = new Editor({
      extensions: this.extensions,
      content: this.modelValue,
      suggestions: this.suggestions,
      onUpdate: () => {
        if (this.$props.outputFormat === 'html') {
          this.$emit('update:modelValue', this.editor.getHTML())
        } else {
          this.$emit('update:modelValue', this.editor.getJSON())
        }
      },
      editorProps: {
        handleDrop: (view, event, slice, moved) => {
          return this.dropEventHandler(view, event, slice, moved)
        }
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },

  methods: {
    // Get the plugins displayed in the toolbar
    getPluginsDisplayed() {
      if (this.preset === 'full') {
        this.pluginsDisplayed = options;
      } else if (this.preset === 'custom') {
        this.pluginsDisplayed = this.plugins;
      } else {
        this.pluginsDisplayed = [
          "bold",
          "italic",
          "underline",
          "link",
          "history"
        ]
      }
    },

    // Get the extensions for the editor
    getEditorExtensions() {
      this.extensions = [
        Document,
        HardBreak,
        Paragraph,
        Text,
        TextStyle,
        Dropcursor,
        Placeholder.configure({
          placeholder: this.translate(this.placeholder, this.locale),
        }),
        CodeBlock,
        Link.configure({
          openOnClick: false,
          defaultProtocol: 'https',
        }),
        Bold,
        Italic,
        Strike,
        Underline,
        Heading.configure({
          levels: [1, 2, 3],
        }),
        BulletList,
        ListItem,
        OrderedList,
        Blockquote,
        History,
        FontFamily.configure({
          types: ['textStyle'],
        }),
        FontSize.configure({
          types: ['textStyle'],
        }),
        Highlight.configure({
          multicolor: true
        }),
        Color.configure({
          types: ['textStyle'],
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Table.configure({
          resizable: false,
          allowTableNodeSelection: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        Image.configure({
          allowBase64: true,
        }),
        ImageResize,
        Youtube.configure({
          controls: true,
          nocookie: true,
        }),
        Panel
      ];

      if (this.suggestions.length > 0) {
        this.extensions = this.extensions.concat([
          Mention.configure({
            HTMLAttributes: {
              class: this.suggestions_class,
            },
            renderText({options, node}) {
              return `test`
            },
            renderHTML({options, node}) {
              return [
                'span',
                options.HTMLAttributes,
                `${node.attrs.label ?? node.attrs.id}`,
              ]
            },
            suggestion: getSuggestion(this.suggestions),
          })
        ]);
      }
    },

    // Upload the image to the server
    async uploadImage(file) {
      return new Promise((resolve, reject) => {
        let response = null;
        const formData = new FormData();
        formData.append('file', file);

        fetch(this.$props.uploadUrl, {
          method: 'POST',
          body: formData
        })
            .then(response => response.json())
            .then(data => {
              this.$emit('uploadedImage', data);
              resolve(data);
            })
            .catch(error => {
              console.error('There was an error uploading the image', error);
              reject(error);
            });
      });
    },

    // Handle the drop event
    dropEventHandler(view, event, slice, moved) {
      if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
        let file = event.dataTransfer.files[0];
        let filesize = ((file.size / 1024) / 1024).toFixed(4);
        if ((file.type === "image/jpeg" || file.type === "image/png") && filesize < 10) {
          this.uploadImage(file).then((response) => {
            //this.editor.chain().focus().setImage({src: response.url}).run();

            const { schema } = view.state;
            const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
            const node = schema.nodes.image.create({ src: response.url }); // creates the image element
            const transaction = view.state.tr.insert(coordinates.pos, node); // places it in the correct position
            return view.dispatch(transaction);
          });
        } else {
          window.alert("Images need to be in jpg or png format and less than 10mb in size.");
        }

        return true; // handled
      }

      return false; // not handled use default behaviour
    },

    // Handle the paste event
    pasteEventHandler(e) {
      // Check if the clipboard event has files
      if (e.clipboardData.files.length > 0) {
        for (var i = 0; i < e.clipboardData.files.length; i++) {
          // Check if file is an image
          if (e.clipboardData.files[i].type.includes('image')) {
            this.uploadImage(e.clipboardData.files[i]).then((response) => {
              this.editor.chain().focus().setImage({src: response.url}).run();
            });
          }
        }
      }
    },

    importImage(e) {
      if(e.target.files.length > 0) {
        for (var i = 0; i < e.target.files.length; i++) {
          // Check if file is an image
          if (e.target.files[i].type.includes('image')) {
            this.uploadImage(e.target.files[i]).then((response) => {
              this.insertImage(response.url);
            });
          }
        }
      }
    },

    insertImage(url) {
      this.editor.chain().focus().setImage({src: url}).run();
    }
  }
}
</script>

<style lang="scss">

</style>
