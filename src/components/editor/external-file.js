import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import CropableFile from './CropableFile.vue'

export default Node.create({
  name: 'external-file',
  atom: true,

  group: 'block',

  addOptions: {
    HTMLAttributes: {

    },
  },

  draggable: true,

  selectable: true,

  addAttributes() {
    return {
      metadata: {
        default: '',
      },
      fileId: {
        default: ''
      },
      location: {
        default: ''
      },
      href: {
        default: ''
      },
      length: {
        default: ''
      },
      name: {
        default: ''
      },
      position: {
        default: '',
      },
    }
  },

  // rendu coté navigateur
  parseHTML() {
    return [
      {
        tag: 'a',
        priority: 1000,
        getAttrs: (node) => {
          const htmlClass = node.getAttribute('class') || ''
          return htmlClass.includes('wiin-editor-file')
        }
      }
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(CropableFile)
  },

  // valeur à enrégistré en base de donnée
  renderHTML({ HTMLAttributes, node }) {
    return [
      'a',
      // mergeAttributes(
      //   { class: 'wiin-editor-file' },
      //   { name: node.attrs.name, fileId: node.attrs.fileId, location: node.attrs.location, href: node.attrs.location, length: node.attrs.length, metadata: node.attrs.metadata },
      // ),
      mergeAttributes(
        this.options.HTMLAttributes,
        HTMLAttributes,
        node.attrs,
        { class: 'wiin-editor-file' },
      ),
      node.attrs.name,
    ]
  },
  addCommands() {
    return {
      setExternalFile:
        (options) =>
          ({ commands }) => {
            // console.log('options', options);
            return commands.insertContent({
              type: this.name,
              attrs: {metadata: JSON.stringify(options), location : options.location, href : options.location, name: options.originalName, fileId: options.id, length: options.length},
            })
          },

          setFilePosition:
        (position) =>
          ({ commands }) => {
            if (position === 'justify') {
              position = 'left'
            }
            return commands.updateAttributes(this.name, { position })
          },
    }
  },
})
