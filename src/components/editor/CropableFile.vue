<template>
  <NodeViewWrapper :class="`cropable-editor wiin-no-scrollview ${position}`">
    <div
      v-if="$props.editor.options.editable"
      class="file-box d-flex align-items-center justify-content-between"
    >
      <div class="file-box__inner">
        <div class="extension">{{ fileExtension }}</div>
        <div class="fs-14">
          <a :href="location" target="_blank" class="file-name">{{ name }}</a>
        </div>
        <div class="pl-2 fs-14">{{ length }} Mo</div>
      </div>
      <div>
        <i
          class="far fa-times-circle cursor-pointer"
          @click.stop="deleteFile"
        ></i>
      </div>
    </div>
    <div v-else>
      <div>
        <a :href="location" target="_blank" class="file-name">{{ name }}</a>
      </div>
    </div>
  </NodeViewWrapper>
</template>
<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'

export default {
  components: {
    NodeViewWrapper,
  },
  props: nodeViewProps,
  data() {
    return {}
  },
  computed: {
    metadata() {
      try {
        return JSON.parse(this.node.attrs.metadata)
      } catch (e) {
        console.log('error', e)
        return {}
      }
    },
    fileExtension() {
      const extension = this.name.slice(this.name.lastIndexOf('.') + 1)
      return extension
    },
    name() {
      return this.node.attrs.name
    },
    fileId() {
      return this.node.attrs.fileId
    },
    location() {
      return this.node.attrs.location === ''
        ? this.node.attrs.href
        : this.node.attrs.location
    },
    length() {
      const x = this.node.attrs.length * 9.537 * Math.pow(10, -7)
      return x.toFixed(2)
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
  methods: {
    deleteFile() {
      this.$s3Upload
        .for(this.$platform.id)
        .deleteFile({ id: this.fileId })
        .catch((err) => {
          console.log(err)
        })

      this.$props.deleteNode(this.node)
    },
  },
}
</script>

<style lang="scss" scoped>
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

.file-box {
  max-width: 500px;
  border: 1px solid #d2d8eb;
  padding: 8px 16px;
  border-radius: 6px;
  box-shadow: 0px 0px 2px #00000020;
  margin: 4px 0 6px;

  &:hover {
    background-color: #e8ebed;
  }

  &__inner {
    display: grid;
    grid-template-columns: 80px 1fr auto;
    align-items: center;

    .extension {
      margin-right: 12px;
      height: 25px;
      min-width: 40px;
      max-width: 60px;
      border-radius: 4px;
      background: #2c77ff;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
    }

    .file-name {
      text-decoration: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 250px;
      display: block;
    }
  }
}
</style>
