import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Cropable from './Cropable.vue'

export default Node.create({
  name: 'external-img',
  atom: true,

  group: 'block',

  addOptions: {
    HTMLAttributes: {
      class: 'img-wrapper',
    },
  },

  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      fileId: {
        default: ''
      },
      src: {
        default: null,
      },
      location: {
        default: ''
      },
      name: {
        default: ''
      },
      frameborder: {
        default: '0',
      },
      height: {
        // default: '200',
      },
      width: {
        // default: '200',
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
        tag: 'img',
        priority: 1000,
      },
      {
        tag: 'cropable',
        priority: 1000,
      },
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(Cropable)
  },

  // valeur à enrégistré en base de donnée
  renderHTML({ HTMLAttributes, node }) {
    // console.log('node', node.attrs)
    // const size = node.attrs.size
    return [
      'div',
      { class: 'wiin-img-wrapper' },
      [
        'img',
        mergeAttributes(
          this.options.HTMLAttributes,
          HTMLAttributes,
          node.attrs,
        ),
      ],
    ]
  },
  addCommands() {
    return {
      setExternalImg:
        (options) =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: { location: options.location, name: options.originalName, fileId: options.id, src: options.location },
            })
          },

      setImgPosition:
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
