<template>
  <NodeViewWrapper :class="`cropable-editor wiin-no-scrollview hide-overflow ${position}`">
    <div
      ref="imgContainer"
      class="tiptap-custom-image-container"
      :class="[{ 'hide-resizer': !$props.editor.options.editable }]"
      :style="`height: ${height}px; width: ${width}px; position: relative; top: 0`"
    >
      <vue-draggable-resizable
        v-if="$props.editor.options.editable"
        ref="resizer"
        class="removetranslation"
        :w="width"
        :h="height"
        :draggable="true"
        :enable-native-drag="true"
        :lock-aspect-ratio="applyRatio"
        @resizestop="onResize"
      >
        <div
          class="test"
          :style="`height: ${height}px; width: ${width}px; position: relative;`"
          @mouseenter="canRemove = true" @mouseleave="canRemove = false"
        >
          <img :style="`height:100%; width: 100%;`" :src="src" alt="" />
          <div v-show="canRemove" class="remove" @click.stop="deleteFile">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </vue-draggable-resizable>
      <div v-else :style="`height: ${height}px; width: ${width}px;`">
        <img :src="src" :style="`height:100%; width: 100%;`" alt="" />
      </div>
    </div>
  </NodeViewWrapper>
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'

export default {
  name: 'ImageNodeView',
  components: {
    'vue-draggable-resizable': VueDraggableResizable,
    NodeViewWrapper,
  },
  props: nodeViewProps,
  data() {
    return {
      applyRatio: false,
      top: 0,
      canRemove: false
    }
  },
  computed: {
    name() {
      return this.node.attrs.name
    },
    fileId() {
      return this.node.attrs.fileId
    },
    src: {
      get() {
        return this.node.attrs.src
      },
      set(src) {
        this.updateAttributes({ src })
      },
    },
    location: {
      get() {
        return this.node.attrs.location
      },
      set(location) {
        this.updateAttributes({ location })
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
    width: {
      get() {
        return (
          this.node.attrs.width ||
          (this.$props.editor.options.editable ? 200 : 'auto')
        )
      },
      set(width) {
        this.updateAttributes({
          width,
        })
      },
    },
    height: {
      get() {
        return (
          this.node.attrs.height ||
          (this.$props.editor.options.editable ? 200 : 'auto')
        )
      },
      set(height) {
        this.updateAttributes({
          height,
        })
      },
    },
  },
  watch: {
    // height (h) {
    //   console.log('ddd', h)
    //   this.$el.querySelector('.test').style.height = h + 'px'
    // },
    //  width (h) {
    //   this.$el.querySelector('.test').style.width = h  + 'px'
    // }
  },
  mounted() {
    // console.log("all props", this.$props);
    window.addEventListener('keydown', this.shiftKeyPress)
    window.addEventListener('keyup', this.shiftKeyLeave)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.shiftKeyPress)
    window.removeEventListener('keyup', this.shiftKeyLeave)
  },
  methods: {
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
      this.$refs.imgContainer.style.width = width + 'px'
      this.$refs.imgContainer.style.height = height + 'px'
    },
    onDrag(x, y) {
      this.x = x
      this.y = y
    },
    deleteFile() {
      this.$s3Upload
        .for(this.$platform.id)
        .deleteFile({ id: this.fileId })
        .catch((err) => {
          console.log(err)
        })

      this.$props.deleteNode(this.node)
    }
  },
}
</script>

<style lang="scss" scoped>
.hide-overflow {
  // overflow: hidden;
}
.cropable-editor {
  max-width: 998px;

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
  .remove {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: black;
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    box-shadow: 0px 0px 6px #00000029;
    font-size: 12px;

    &:hover {
      scale: 1.2;
    }
  }
}
</style>
