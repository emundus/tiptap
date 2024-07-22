import { Extension, mergeAttributes } from '@tiptap/core'

export default Extension.create({
  name: 'editor-video',
  // group: 'block',
  group () {
    return this.options.inline ? 'inline' : 'block'
  },
  inline () {
    return this.options.inline
  },
  // atom: true,
  // defaultOptions: {
  //     allowFullscreen: true,
  //     HTMLAttributes: {
  //         class: 'iframe-wrapper',
  //     },
  // },

  addOptions: {
    inline: false,
    HTMLAttributes: {}
  },

  addAttributes () {
    return {
      src: {
        default: null
      },
      frameborder: {
        default: 0
      },
      // allowfullscreen: {
      //     default: this.options.allowFullscreen,
      //     parseHTML: function () { return _this.options.allowFullscreen; },
      // },
      allow: {
        default: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      },
      allowfullscreen: {
        default: 'allowfullscreen'
      }
    }
  },

  // parseHTML: function () {
  //     return [{
  //             tag: 'iframe',
  //         }];
  // },
  // renderHTML: function (_a) {
  //     var HTMLAttributes = _a.HTMLAttributes;
  //     console.log('html attr', HTMLAttributes)
  //     console.log('_a from render', _a)
  //     //return ['div', this.options.HTMLAttributes, ['iframe', HTMLAttributes]];
  //     return ['div', this.options.HTMLAttributes, _a.options.src];
  // },

  parseHTML () {
    return [
      {
        tag: 'iframe[src]'
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    console.log('html attribute', HTMLAttributes)
    return ['div', { class: 'video-wrapper' }, ['iframe', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]]
  },

  // addNodeView() {
  //     return () => {
  //       const container = document.createElement('div')
  //       container.addEventListener('click', event => {
  //         alert('clicked on the container')
  //       })
  //       const content = document.createElement('div')
  //       container.append(content)
  //       return {
  //         dom: container,
  //         contentDOM: content,
  //       }
  //     }
  //   },

  // addCommands: function () {
  //     var _this = this;
  //     // return {
  //     //     setIframe: function (options) { return function (_a) {
  //     //         console.log('enter setIframe fonction')
  //     //         console.log('contenu de this', _this)
  //     //         console.log('contenu de this type', _this.type)
  //     //         console.log('contenu de _a', _a)
  //     //         // var tr = _a.tr, dispatch = _a.dispatch;
  //     //         // var selection = tr.selection;
  //     //         // var node = _this.type.create(options);
  //     //         // if (dispatch) {
  //     //         //     tr.replaceRangeWith(selection.from, selection.to, node);
  //     //         // }
  //     //         // return true;
  //     //     }; },
  //     // };

  //     return {
  //         setIframe: options => (all) => {
  //         //   console.log(options)
  //         //   console.log('all', all)
  //         //   console.log('this', this)
  //           this.options.src = options.src

  //         //   var selection = tr.selection;
  //         //   console.log('selection', selection)
  //         //   var node = this.type.create(options);
  //         //   if (dispatch) {
  //         //       tr.replaceRangeWith(selection.from, selection.to, node);
  //         //   }

  //           return true
  //           //return this.options.types.every(type => commands.updateAttributes(type, { textAlign: alignment }))
  //         }

  //       }
  // },
  addCommands () {
    return {
      setIframe: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options
        })
      }
    }
  }
})
