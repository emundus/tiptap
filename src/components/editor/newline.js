// src/extensions/CustomBreak.js
import { Node } from '@tiptap/core'

const CustomBreak = Node.create({
  name: 'customBreak',

  group: 'inline',

  inline: true,

  selectable: false,

  parseHTML() {
    return [
      { tag: 'br' },
    ]
  },

  renderHTML() {
    return ['br']
  },

  addCommands() {
    return {
      setCustomBreak: () => ({ commands }) => {
        return commands.insertContent('<br>')
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.setCustomBreak(),
    }
  },
})

export default CustomBreak