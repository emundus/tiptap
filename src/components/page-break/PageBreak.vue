<template>
  <div id="main">
    <div id="content">
      <div ref="editableDiv" class="overflowDiv" contenteditable="true" @input="onContentChange">
        This is a long text that will cause an overflow in the div. I just wanna type text to overlap the content and i do not care what is means ok ?
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overflowingContent: '',
      activeDivRef: ''
    };
  },
  methods: {
    onContentChange() {
      const overflowContent = this.getOverflowingContent();
      if (overflowContent) {
        this.overflowingContent = overflowContent;

        const newDiv = document.createElement("div");
        newDiv.contentEditable = true;
        newDiv.addEventListener('input', this.onContentChange)
        newDiv.className = "overflowDiv"
        const newRef = 'newDivRef'; // Set your desired ref name
        this.$refs[newRef] = newDiv;
        this.activeDivRef = newRef;

        const contentElement = document.getElementById('content')
        newDiv.style.border = '1px solid black';
        newDiv.style.padding = '15px';
        newDiv.style.backgroundColor = 'red';
        newDiv.style.color = 'white'
        newDiv.style.padding = '10px';
        newDiv.style.width = '200px';
        newDiv.style.height = '100px';
        newDiv.style.overflow = 'hidden';
        newDiv.style.marginTop = '10px';
        contentElement.appendChild(newDiv)
        newDiv.focus()
      } else {
        this.overflowingContent = '';
      }
    },
    getOverflowingContent() {
      let div
      if(this.activeDivRef !== '') {
        div = this.$refs[this.activeDivRef];
      } else {
        div = this.$refs.editableDiv;
      }

      const originalContent = div.textContent;
      div.style.overflow = 'visible';
      const visibleHeight = div.clientHeight;
      const scrollHeight = div.scrollHeight;
      div.style.overflow = 'hidden';

      if (scrollHeight > visibleHeight) {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.width = div.clientWidth + 'px';
        document.body.appendChild(tempDiv);

        let start = 0;
        let end = originalContent.length;
        let mid;

        while (start < end) {
          mid = Math.floor((start + end) / 2);
          tempDiv.textContent = originalContent.slice(0, mid);
          if (tempDiv.scrollHeight > visibleHeight) {
            end = mid;
          } else {
            start = mid + 1;
          }
        }

        tempDiv.textContent = originalContent.slice(0, end - 1);
        const visibleContent = tempDiv.textContent;
        const overflowingContent = originalContent.slice(end - 1);

        document.body.removeChild(tempDiv);
        return overflowingContent.trim();
      }

      return null;
    }
  }
};
</script>

<style scoped>
  #main {
    background-color: #F9FBFD;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  #content div {
    background-color: red;
    color: white;
    width: 200px;
    height: 100px;
    overflow: hidden;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
  }
</style>
