<template>
  <div :id="id" class="popover-container" @focusout="onFocusOut">
    <font-awesome-icon :icon="['fas', icon]" @click="onClickToggle"/>
    <transition name="fade">
      <div v-if="isOpen" class="popover-content tw-shadow tw-rounded" ref="popoverContent" :style="popoverContentStyle">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: 'Popover',
  components: {
    FontAwesomeIcon
  },
  props: {
    // Icon name from Font Awesome
    icon: {
      type: String,
      required: true
    },
    // Position of the popover content
    position: {
      type: String,
      default: 'bottom' // top, bottom, left, right
    },
    // Style object for the popover content
    popoverContentStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    id: 'popover-' + Math.random().toString(36).substr(2, 9),
    isOpen: false
  }),
  mounted() {
    this.calculatePosition();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    calculatePosition() {
      const popoverContentContainer = this.$refs.popoverContent;

      if (popoverContentContainer) {
        // get Width and Height of popover content first child
        const popoverContentWidth = popoverContentContainer.children[0].offsetWidth;
        const popoverContentHeight = popoverContentContainer.children[0].offsetHeight;
        //

        // get popover-toggle-btn height and width
        const popoverToggleBtnWidth = popoverContentContainer.previousElementSibling.offsetWidth;
        const popoverToggleBtnHeight = popoverContentContainer.previousElementSibling.offsetHeight;

        const margin = 4;

        // set position of popover content
        switch (this.position) {
          case 'top':
            // center popover content and make it appear above the toggle button
            popoverContentContainer.style.left = `calc(50% - ${popoverContentWidth / 2}px)`;
            popoverContentContainer.style.bottom = `${popoverToggleBtnHeight + margin}px`;
            break;
          case 'left':
            // center popover content and make it appear left of the toggle button
            popoverContentContainer.style.top = `calc(50% - ${popoverContentHeight / 2}px)`;
            popoverContentContainer.style.right = `${popoverToggleBtnWidth + margin}px`;
            break;
          case 'right':
            // center popover content and make it appear right of the toggle button
            popoverContentContainer.style.top = `calc(50% - ${popoverContentHeight / 2}px)`;
            popoverContentContainer.style.left = `${popoverToggleBtnWidth + margin}px`;
            break;
          case 'bottom':
          default:
            // center popover content and make it appear below the toggle button
            popoverContentContainer.style.left = `calc(50% - ${popoverContentWidth / 2}px)`;
            popoverContentContainer.style.top = `${popoverToggleBtnHeight + margin}px`;
            break;
        }
      }
    },
    onClickToggle() {
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        this.calculatePosition();
      }
    },
    onFocusOut() {
      this.isOpen = false;
    },
    handleClickOutside(event) {
      const clickedElement = event.target;

      // if clicked element is not inside this component then close popover
      if (!clickedElement.closest('#' + this.id)) {
        this.isOpen = false;
      }
    }
  }
}

</script>

<style scoped>
.popover-container {
  position: relative;
  display: inline-block;
}

.popover-content {
  background-color: white;
  position: absolute;
  min-height: 40px;
  min-width: 100px;
  opacity: 1;
  z-index: 9999;

  transition: opacity 0.2s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>