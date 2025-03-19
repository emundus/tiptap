import { Node } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import InfoPanelComponent from './Panel.vue';

export const InfoPanel = Node.create({
    name: 'infoPanel',
    group: 'block',
    content: 'block+',
    defining: true,

    addAttributes() {
        return {
            type: {
                default: 'info',
                parseHTML: element => element.getAttribute('data-type') || 'info',
                renderHTML: attributes => ({
                    'data-type': attributes.type,
                }),
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', HTMLAttributes, 0];
    },

    addNodeView() {
        return VueNodeViewRenderer(InfoPanelComponent);
    },
});
