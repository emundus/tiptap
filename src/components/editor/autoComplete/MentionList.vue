<template>
  <div class="items">
    <template v-if="items.length">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="item"
        :class="{ 'is-selected': index === selectedIndex }"
        @click="selectItem(index)"
      >
        {{ item.label }}
      </button>
    </template>
    <div v-else class="item">No result</div>
  </div>
</template>
  
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  watch: {
    items() {
      this.selectedIndex = 0
    },
  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },

    upHandler() {
      // console.log('uphandler', this.items.length);
      this.selectedIndex =
        (this.selectedIndex + this.items.length - 1) % this.items.length
    },

    downHandler() {
      // console.log('downHandler', this.items.length);
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index]

      if (item) {
        this.command({ id: item.id, label: item.label })
      }
    },
  },
}
</script>
  
<style scoped lang="scss">
.items {
  padding: 12px;
  position: relative;
  border-radius: 0.5rem;
  background: #fff;
  color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  font-size: 0.9rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0px 10px 20px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  width: 500px;
  overflow: auto;

  .item {
    display: block;
    margin: 0;
    width: 100%;
    text-align: left;
    background: transparent;
    border-radius: 0.4rem;
    border: 1px solid transparent;
    padding: 0.2rem 0.4rem;

    &.is-selected {
      border-color: #000;
    }
  }
}
</style>