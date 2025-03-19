<script>
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3';
import translate from "@/mixins/translate.js";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent
  },

  props: {
    editor: Object,
    node: Object,
    updateAttributes: Function
  },

  mixins: [translate],

  inject: ['locale'],

  data() {
    return {
      selectedType: this.node?.attrs.type || 'info'
    };
  },
  computed: {
    icon() {
      switch (this.selectedType) {
        case 'warning':
          return 'warning';
        case 'error':
          return 'error';
        default:
          return 'info';
      }
    },
    iconColor() {
      switch (this.selectedType) {
        case 'warning':
          return '#b38405';
        case 'error':
          return '#a60e15';
        default:
          return '#525b85';
      }
    },
    isActive() {
      const { state } = this.editor;
      const { from, to } = state.selection;
      const nodePos = this.getPos?.();

      if (typeof nodePos !== 'number') return false;

      return from >= nodePos && to <= nodePos + this.node.nodeSize;
    }


  },
  watch: {
    selectedType(newVal) {
      if (this.node && newVal !== this.node.attrs.type) {
        this.updateAttributes({ type: newVal });
      }
    }
  },
  methods: {
    updateType(event) {
      if (!this.node) return;
      this.selectedType = event.target.value;
    }
  }
};
</script>

<template>
  <NodeViewWrapper :class="`panel info-panel--${selectedType}`">
    <div v-if="isActive" class="info-panel__actions">
      <select @change="updateType" :value="selectedType" class="info-panel__select">
        <option value="info">{{ translate('toolbar.panel.type.info', this.locale) }}</option>
        <option value="warning">{{ translate('toolbar.panel.type.warning', this.locale) }}</option>
        <option value="error">{{ translate('toolbar.panel.type.error', this.locale) }}</option>
      </select>
    </div>

    <div class="info-panel--block">
      <span class="material-symbols-outlined" :style="{color: iconColor}">{{ icon }}</span>
      <NodeViewContent class="info-panel__content" />
    </div>
  </NodeViewWrapper>
</template>

<style>
.panel {
  padding: 10px;
  background: #ebeefa;
  border-radius: 4px;
  margin: 10px 0;
  position: relative;
}

.info-panel--block {
  display: flex;
  align-items: start;
  gap: 0.75rem;
}

.info-panel--block .material-symbols-outlined {
  font-size: 20px;
}

.info-panel__content {
  p {
    margin-bottom: 0;
    line-height: 1.25rem;
  }
}

.info-panel__actions {
  position: absolute;
  top: 5px;
  right: 10px;
  display: flex;
  align-items: center;
}

.info-panel__select {
  background: white;
  font-size: 14px;
  border: solid 1px gray;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
}

.info-panel--warning {
  background: #fff6de;
}

.info-panel--error {
  background: #fae9e9;
}

.info-panel__delete {
  font-size: 16px;
  color: #b00020;
  cursor: pointer;
  transition: opacity 0.2s;
}

.info-panel__delete:hover {
  opacity: 0.7;
}
</style>
