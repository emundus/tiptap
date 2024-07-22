import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TipTapEditor",
  description: "An editor for Vue.js based on TipTap package",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quick start', link: '/quick-start' }
    ],

    sidebar: [
      {
        items: [
          { text: 'Quick start', link: '/quick-start' }
        ]
      },
      {
        text: 'Main Components',
        items: [
          { text: 'Editor', link: '/TipTapEditor' },
          { text: 'Toolbar', link: '/Toolbar' }
        ]
      },
      {
        text: 'Plugins',
        items: [
          { text: 'Mentions', link: '/MentionList' },
          { text: 'Media', link: '/MediaLibrary' }
        ]
      },
      {
        text: 'Utils',
        items: [
          { text: 'Popover', link: '/Popover' },
          { text: 'Modal', link: '/Modal' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/emundus/tiptap' }
    ]
  },
  base: '/tiptap/'
})
