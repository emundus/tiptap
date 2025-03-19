<script setup>
import { ref, watchEffect, computed } from 'vue';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const props = defineProps({
  editor: Object,
  node: Object,
  updateAttributes: Function,
});

if (!props.node) {
  console.error('Erreur: props.node est undefined');
}

const selectedType = ref(props.node?.attrs.type || 'info');

watchEffect(() => {
  if (props.node && selectedType.value !== props.node.attrs.type) {
    props.updateAttributes({ type: selectedType.value });
  }
});

const updateType = (event) => {
  if (!props.node) return;
  selectedType.value = event.target.value;
};

const icon = computed(() => {
  switch (selectedType.value) {
    case 'warning':
      return 'exclamation-triangle';
    case 'error':
      return 'error';
    default:
      return 'info';
  }
});
</script>

<template>
  <NodeViewWrapper :class="`info-panel info-panel--${selectedType}`">
      <select @change="updateType" :value="selectedType" class="info-panel__select">
        <option value="info">Info</option>
        <option value="warning">Warning</option>
        <option value="error">Error</option>
      </select>

    <div>
      <font-awesome-icon :icon="['fas', icon]"/>
      <NodeViewContent class="info-panel__content" />
    </div>

  </NodeViewWrapper>
</template>

<style>
.info-panel {
  padding: 10px;
  border-left: 4px solid;
  background: #ebeefa;
  border-radius: 4px;
  margin: 10px 0;
  position: relative;
}

.info-panel__select {
  position: absolute;
  top: 5px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 14px;
}

.info-panel--info {
  border-color: #0052cc;
}

.info-panel--warning {
  border-color: #ffab00;
  background: #fff7e6;
}

.info-panel--error {
  border-color: #de350b;
  background: #ffebe6;
}
</style>
