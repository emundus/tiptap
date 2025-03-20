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
      selectedType: this.node?.attrs.type || 'info',

      icons: [
        { value: 'info', label: this.translate('toolbar.panel.type.info') },
        { value: 'warning', label: this.translate('toolbar.panel.type.warning') },
        { value: 'error', label: this.translate('toolbar.panel.type.error') }
      ]
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
    /*updateType(event) {
      if (!this.node) return;
      this.selectedType = value;
    }*/
  }
};
</script>

<template>
  <NodeViewWrapper :class="`info-panel info-panel--${selectedType}`">
    <div v-if="isActive" class="info-panel__actions">
<!--      <template v-for="icon in icons" :key="icon.value">
        <span
          class="material-symbols-outlined"
          :class="{ 'info-panel__icon&#45;&#45;active': icon.value === selectedType }"
          :title="icon.label"
          @click="updateType(icon.value)"
        >
          {{ icon.value }}
        </span>
      </template>-->

      <select v-model="selectedType" class="info-panel__select">
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
