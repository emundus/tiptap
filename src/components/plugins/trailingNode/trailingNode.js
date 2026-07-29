import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

/**
 * Ensures the document always ends with an editable node (a paragraph by
 * default). Without it, an isolating block (panel, table, image, ...) placed
 * as the last node in the document traps the cursor with no way out.
 *
 * @see https://github.com/ueberdosis/tiptap/issues/155
 */
export const TrailingNode = Extension.create({
    name: 'trailingNode',

    addOptions() {
        return {
            node: 'paragraph',
            notAfter: ['paragraph'],
        };
    },

    addProseMirrorPlugins() {
        const pluginKey = new PluginKey(this.name);
        const disabledNodeTypes = Object.values(this.editor.schema.nodes)
            .filter(nodeType => this.options.notAfter.includes(nodeType.name));

        const needsTrailingNode = doc => {
            const lastNode = doc.lastChild;
            return !disabledNodeTypes.includes(lastNode?.type);
        };

        return [
            new Plugin({
                key: pluginKey,
                appendTransaction: (_transactions, _oldState, newState) => {
                    if (!pluginKey.getState(newState)) {
                        return null;
                    }

                    const { doc, tr, schema } = newState;
                    const nodeType = schema.nodes[this.options.node];

                    if (!nodeType) {
                        return null;
                    }

                    return tr.insert(doc.content.size, nodeType.create());
                },
                state: {
                    init: (_config, state) => needsTrailingNode(state.doc),
                    apply: (tr, previous) => {
                        if (!tr.docChanged) {
                            return previous;
                        }

                        return needsTrailingNode(tr.doc);
                    },
                },
            }),
        ];
    },
});
