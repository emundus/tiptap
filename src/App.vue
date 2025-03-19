<template>
  <div id="app" class="editor-p-8">
   <TiptapEditor
       v-model="content"
       :locale="'fr'"
       :suggestions="suggestions"
       :preset="preset"
       :plugins="plugins"
       :media-files="files"
       :editor-content-height="'30em'"
   />
  </div>
</template>

<script>
import TiptapEditor from "@/components/TipTapEditor.vue"


export default {
  name: "App",
  components: {
    TiptapEditor
  },
  data() {
    return {
      content: `
        <h1>TipTap Editor Wiin + eMundus</h1>
        <div data-plugin="panel" data-type="info"><span class="material-symbols-outlined">info</span><div><p>Bonjour</p></div></div>
        <p>Welcome to this common editor built with TipTap, Vue3 and Tailwind</p>
        <pre><code>import TipTapEditor from "tip-tap-editor";
import "tip-tap-editor/style.css";</code></pre>
        <img src='/public/uploads/images/placeholder-image.jpg' alt='placeholder' />`,
      suggestions: [
        { id: 1, label: 'Nom de la campagne', value: '[CAMPAIGN_LABEL]' },
        { id: 2, label: 'Nom du candidat', value: '[APPLICANT_NAME]' }
      ],
      preset: 'full',
      plugins: ['bold','italic','h1','h2','ul'],
      files: [
        {
          name: 'placeholder-image-fdsf-fdsfdsf-fdsfdsfds-fdf.jpg',
          size: 1000,
          url: '/public/uploads/images/placeholder-image.jpg',
          type: 'image',
          attributes: [
            {
              name: 'dimensions',
              value: '100x100'
            },
            {
              name: 'uploaded_by',
              value: 'admin'
            }
          ]
        },
        {
          name: 'image F.jpg',
          size: 1000,
          url: '/public/uploads/images/placeholder-image.jpg',
          type: 'image',
          attributes: [
            {
              name: 'dimensions',
              value: '200x200'
            },
            {
              name: 'uploaded_by',
              value: 'admin'
            }
          ]
        }
      ]
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
