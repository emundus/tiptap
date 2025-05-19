import { Node, mergeAttributes } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import PanelComponent from './Panel.vue';

export const Panel =  Node.create({
    name: 'panel',
    group: 'block',
    content: 'block+',
    selectable: true,
    defining: true,
    isolating: true,

    addAttributes() {
        return {
            type: {
                default: 'info',
                parseHTML: element => element.getAttribute('data-type') || 'info',
                renderHTML: attributes => ({ 'data-type': attributes.type }),
            },
            draggable: {
                default: false,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "div[data-plugin='panel']",
                contentElement: 'div',
            },
        ];
    },

    renderHTML({ node, HTMLAttributes }) {
        return [
            'div',
            mergeAttributes({ 'data-plugin': 'panel', 'data-type': node.attrs.type }),
            ['span', { class: 'material-symbols-outlined' }, node.attrs.type],
            ['div', 0]
        ];
    },

    addNodeView() {
        return VueNodeViewRenderer(PanelComponent);
    },

    addKeyboardShortcuts() {
        return {
            Enter: ({ editor }) => {
                const { state, dispatch } = editor;
                const { selection } = state;
                const { $from, $to } = selection;

                const panelNode = $from.node(-1);
                const isInPanel = panelNode?.type.name === 'panel';

                const isAtEnd = $to.parentOffset === $to.parent.content.size;

                if (isInPanel && isAtEnd) {
                    const posAfterPanel = $from.after($from.depth - 1);

                    dispatch(
                        state.tr.insert(posAfterPanel, state.schema.nodes.paragraph.create()).scrollIntoView()
                    );

                    return true;
                }

                return false;
            },
        };
    }


});
