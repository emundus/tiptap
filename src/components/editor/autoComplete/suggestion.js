import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import Fuse from 'fuse.js'

import MentionList from './MentionList.vue'

const getSuggestion = function () {

  return {
    items({ query, editor }) {


      const fuse = new Fuse([...editor.options.suggestions], {
        keys: ['label']
      })
      const result = fuse.search(query)
      return query === '' ? editor.options.suggestions : result.map( r => r.item)
    },

    char: '@',

    allowSpaces: true,

    render: () => {
      let component
      let popup

      return {
        onStart: (props) => {
          component = new VueRenderer(MentionList, {
            parent: this,
            propsData: props,
          })

          if (!props.clientRect) {
            return
          }

          popup = tippy('body', {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
          })
        },

        onUpdate(props) {
          component.updateProps(props)

          if (!props.clientRect) {
            return
          }

          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          })
        },

        onKeyDown(props) {
          if (props.event.key === 'Escape') {
            popup[0].hide()

            return true
          }

          return component.ref?.onKeyDown(props)
        },

        onExit() {
          popup[0].destroy()
          component.destroy()
        },
      }
    },
  }
}

export { getSuggestion }  