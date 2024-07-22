<template>
  <NodeViewWrapper class="cropable" :class="position">
    <div
      ref="videoContainer"
      class="tiptap-custom-video-container"
      :class="{ 'hide-resizer': !$props.editor.options.editable }"
      :style="`height: ${height}px; width: ${width}px; position: relative; top: 0; max-width: 100%;`"
    >
      <vue-draggable-resizable
        :w="width"
        :h="height"
        :draggable="true"
        :lock-aspect-ratio="applyRatio"
        style="max-width: 100%"
        @resizestop="onResize"
      >
        <div class="wiin-video-wrapper">
          <iframe :src="src"></iframe>
        </div>
      </vue-draggable-resizable>
    </div>
  </NodeViewWrapper>
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import Plyr from 'plyr'

export default {
  components: {
    'vue-draggable-resizable': VueDraggableResizable,
    NodeViewWrapper,
  },
  props: nodeViewProps,
  data() {
    return {
      applyRatio: false,
    }
  },
  computed: {
    src: {
      get() {
        return this.isVimeoLInk(this.node.attrs.src)
      },
      set(src) {
        this.updateAttributes({ src })
      },
    },
    width: {
      get() {
        return parseInt(this.node.attrs.width)
      },
      set(width) {
        this.updateAttributes({
          width,
        })
      },
    },
    height: {
      get() {
        return parseInt(this.node.attrs.height)
      },
      set(height) {
        this.updateAttributes({
          height,
        })
      },
    },
    position: {
      get() {
        return this.node.attrs.position
      },
      set() {
        // this.updateAttributes({ position })
        this.updateAttributes({ position: this.node.attrs.position })
      },
    },
  },
  mounted() {
    // console.log("all props", this.$props);
    // console.log("node attrs", this.node.attrs);

    setTimeout(function () {
      const video = document.querySelector('.wiin-video-wrapper')
      new Plyr(video)
    }, 400)

    window.addEventListener('keydown', this.shiftKeyPress)
    window.addEventListener('keyup', this.shiftKeyLeave)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.shiftKeyPress)
    window.removeEventListener('keyup', this.shiftKeyLeave)
  },
  methods: {
    isVimeoLInk(link) {
      const x = link.split('/')
      if (x.includes('vimeo.com')) {
        return 'https://player.vimeo.com/video/' + x[x.length - 1]
      } else {
        return link
      }
    },
    shiftKeyPress(event) {
      if (event.keyCode === 16) {
        this.applyRatio = true
      }
    },
    shiftKeyLeave(event) {
      if (event.keyCode === 16) {
        this.applyRatio = false
      }
    },
    onResize(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.$refs.videoContainer.style.width = width + 'px'
      this.$refs.videoContainer.style.height = height + 'px'
    },
    onDrag(x, y) {
      this.x = x
      this.y = y
    },
  },
}
</script>

<style lang="scss" scoped>
.cropable {
  &.left {
    display: flex;
    justify-content: left;
  }

  &.center {
    display: flex;
    justify-content: center;
  }

  &.right {
    display: flex;
    justify-content: right;
  }
}
</style>
