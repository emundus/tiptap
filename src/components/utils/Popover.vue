<template>
  <div :id="id" class="popover-container" @focusout="onFocusOut">
    <div @click="onClickToggle">
      <span v-if="text">
      {{ text }}
      <font-awesome-icon :icon="['fas', 'chevron-down']"/>
    </span>
      <font-awesome-icon v-if="icon" :icon="['fas', icon]"/>
    </div>

    <transition name="fade">
      <div v-show="isOpen" class="popover-content tw-shadow tw-rounded" ref="popoverContent" :id="'popover-content-'+id" :style="popoverContentStyle">
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
      required: false
    },
    // Text to display for toggle button
    text: {
      type: String,
      required: false
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
  created() {
    this.calculatePosition();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    calculatePosition() {
      const popoverContentContainer = this.$refs.popoverContent;
      console.log(popoverContentContainer)

      if (popoverContentContainer) {
        // get Width and Height of popover content first child
        const popoverContentWidth = popoverContentContainer.children[0].offsetWidth;
        const popoverContentHeight = popoverContentContainer.children[0].offsetHeight;
        //

        // get popover-toggle-btn height and width
        const popoverToggleBtnWidth = popoverContentContainer.previousElementSibling.offsetWidth;
        const popoverToggleBtnHeight = popoverContentContainer.previousElementSibling.offsetHeight;

        const margin = 10;

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
            popoverContentContainer.style.left = `-4px`;
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
  background-color: transparent;
  position: absolute;
  min-height: 40px;
  min-width: 100px;
  opacity: 1;
  z-index: 9999;

  transition: opacity 0.2s ease-in-out;
}

.popover-container svg {
  width: 8px !important;
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