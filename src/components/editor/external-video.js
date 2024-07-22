import { Node, mergeAttributes } from '@tiptap/core'
import Plyr from 'plyr'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import CropableVideo from './CropableVideo.vue'

export default Node.create({
  name: 'external-video',
  atom: true,

  addOptions: {
    inline: false,
    HTMLAttributes: {},
  },

  inline() {
    return this.options.inline
  },

  group() {
    return this.options.inline ? 'inline' : 'block'
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      title: {
        default: null,
      },
      frameborder: {
        default: '0',
      },
      allow: {
        default:
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      },
      allowfullscreen: {
        default: 'allowfullscreen',
      },
      height: {
        default: '410',
      },
      width: {
        default: '729',
      },
      position: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'iframe[src]',
      },
    ]
  },

  // parseHTML () {
  //   return [
  //     {
  //       tag: 'cropablevideo'
  //     }
  //   ]
  // },

  addNodeView() {
    return VueNodeViewRenderer(CropableVideo)
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      'div',
      { class: `wiin-video-wrapper` },
      [
        'iframe',
        mergeAttributes(
          this.options.HTMLAttributes,
          HTMLAttributes,
          node.attrs
        ),
      ],
      // ['cropablevideo', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, node.attrs)]
    ]
  },
  addCommands() {
    return {
      setExternalVideo:
        (options) =>
        ({ commands }) => {
          const currentVideo = commands.insertContent({
            type: this.name,
            attrs: options,
          })
          return currentVideo
        },

        setVideoPosition:
        (position) =>
          ({ commands }) => {
            if (position === 'justify') {
              position = 'left'
            }
            return commands.updateAttributes(this.name, { position })
          },
    }
  },

  onCreate() {
    // The editor is ready.
    // console.log('Show all options', this.editor.options.editable)
    setTimeout(function () {
      const video = document.querySelector('.wiin-video-wrapper')
      // eslint-disable-next-line no-new
      new Plyr(video)
    }, 400)
  },
  onUpdate() {
    // The content has changed.
    setTimeout(function () {
      const video = document.querySelector('.wiin-video-wrapper')
      // eslint-disable-next-line no-new
      new Plyr(video)
    }, 400)
  }
})
