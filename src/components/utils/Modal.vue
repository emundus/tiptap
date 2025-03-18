<template>
  <transition
      :name="transition"
      :duration="delay"
  >
    <div v-show="isOpened" :id="'modal___' + name" class="modal___container" ref="modal_container" @focusout="onFocusOut">
      <slot></slot>
    </div>
  </transition>
</template>

<script>

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: 'auto'
    },
    transition: {
      type: String,
      default: 'fade'
    },
    delay: {
      type: Number,
      default: 0
    },
    clickToClose: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return({
      isOpened: false
    });
  },
  mounted() {
    this.open();
  },
  methods: {
    open() {
      this.$emit('beforeOpen');
      this.isOpened = true;

      this.$refs.modal_container.style.width = this.width;
      this.$refs.modal_container.style.height = this.height;
      this.$refs.modal_container.style.zIndex = 999999;
      this.$refs.modal_container.style.opacity = 1;

    },
    close() {
      this.$refs.modal_container.style.zIndex = -999999;
      this.$refs.modal_container.style.opacity = 0;

      this.$emit('closed');
    },
    onFocusOut() {
      if (this.clickToClose) {
        this.close();
      }
    }
  }
}

</script>

<style scoped>
.modal___container {
  padding: 12px;
  max-height: 90vh;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 9999px 9999px rgb(0 0 0 / 43%);
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 8px;
}
</style>