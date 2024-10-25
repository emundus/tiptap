
# Editor - eMundus & Wiin

This project is built using the [TipTap](https://tiptap.dev/) editor framework, designed for creating rich text editors with a flexible, extensible architecture. The project includes custom extensions to enhance the editor's capabilities, allowing developers to easily integrate and customize text editing functionality in their applications.

## Demo
https://emundus.github.io/tiptap/

## Features
### TipTap Editor
Core editor functionality built using TipTap, a highly customizable editor based on ProseMirror.

### Custom Extensions:
Custom extensions to enhance the editor's capabilities

#### Image Upload
Upload images directly into the editor by passing an upload url as a prop.

![Image Upload](/public/demo/image_upload.png "Image upload")

#### Image Resize
Resize images by dragging the corners of the image.

#### Image Library
Select images from a library to insert into the editor.

![Media Library](/public/demo/media_library.png "Media Library")

#### Tables
Insert and edit tables in the editor.

![Tables](/public/demo/table.png "Tables")
#### Mentions
List of users, tags, or other entities that can be mentioned in the editor by typing a character that you define as a trigger.

![Mentions](/public/demo/mentions.png "Mentions")


## Built with

[![Vue3](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)

## Getting Started
### Prerequisites
#### NodeJS
[![NodeJS](https://img.shields.io/badge/min-16.x-orange)](https://nodejs.org/)
[![NodeJS](https://img.shields.io/badge/recommended-18.x-green)](https://nodejs.org/)

### Development
#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run dev
```

#### Compiles and minifies for production
```
npm run build
```

#### Generate documentation
1. First install vuese
```
npm install -g @vuese/cli
```
2. Then generate the documentation
```
vuese gen
```
3. The documentation is generated in the `docs` folder. You can preview it by running the following command
```
npm run docs:dev
```
4. To build the documentation for production
```
npm run docs:build
```


## Acknowledgements

- [FontAwesome icons](https://fontawesome.com/icons)
- [TipTap](https://tiptap.dev/)
- [VitePress](https://vitepress.dev/)
- [Vuese](https://vuese.github.io/website/cli/#writing-documentation-for-your-component)


## Roadmap

- [ ] Inserting a table of contents based on headings in the body text
- [ ] Allow to display editor with A4 format
- [ ] Change the font of a text selection. Propose a default list, imagine the possibility of installing a font requested by the customer
- [X] Tables
- [ ] Quickly search for a keyword in my document
- [ ] Inserting a header with images and text
- [ ] Inserting a footer with images and text
- [ ] Inserting a watermark in the background of my document
- [ ] Inserting a page number in the footer


## Authors

- [@bhubinet](https://github.com/bhubinet)
- [@JeremyLegendre](https://github.com/JeremyLegendre)

## Powered by
<table>
  <tr>
    <td align="center">
      <a href="https://www.emundus.fr/">
        <img src="https://www.emundus.fr/images/logo/Emundus-LogoTypo-RVB.svg" width="50"><br>
        <strong>eMundus</strong>
      </a>
    </td>
    <td align="center">
      <a href="https://wiin.io/">
        <img src="https://cdn.prod.website-files.com/628b5057a29ac42a4a50795d/628f8fb54618678f76f69787_logo.svg" width="50"><br>
        <strong>WiiN</strong>
      </a>
    </td>
  </tr>
</table>

