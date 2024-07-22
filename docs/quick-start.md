# Quick start
```
npm install https://github.com/emundus/tiptap
```

## Usage
```vue
<template>
  <tip-tap-editor v-model="content"/>
</template>

<script>
import TipTapEditor from 'tip-tap-editor'
import 'tip-tap-editor/style.css'

export default {
  components: {
    TipTapEditor
  },
  data() {
    return {
      content: ''
    }
  }
}
</script>
```