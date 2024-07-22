# TipTapEditor

Main editor component

## Props

<!-- @vuese:TipTapEditor:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|modelValue|-|`String`|`false`|-|
|locale|Locale language for the editor (en, fr)|`String`|`true`|en|
|outputFormat|Output format for the editor (html, json)|`String`|`true`|html|
|uploadUrl|Upload URL for images|`String`|`false`|-|
|suggestions|Suggestions for the mention plugin|`Array`|`false`|[]|
|suggestionsClass|Class for the mention suggestions|`String`|`false`|mention|
|preset|Preset for the toolbar (basic, full or custom). If custom, you need to provide the plugins|`String`|`true`|basic|
|plugins|Plugins for the toolbar|`Array`|`false`|[]|
|placeholder|Placeholder for the editor|`String`|`false`|placeholder.default|
|palette|Palette colors for the editor|`Array`|`false`|-|
|fontFamilies|Font families for the editor|`Array`|`false`|["Arial","Calibri","Helvetica","Times New Roman","Comic Sans MS","Caveat"]|
|wrapperClasses|-|`Array`|`false`|editor-wrapper|
|toolbarClasses|Class for the toolbar|`Array`|`false`|-|
|editorContentClasses|Class for the editor content|`Array`|`false`|-|
|editorContentHeight|-|`String`|`false`|auto|

<!-- @vuese:TipTapEditor:props:end -->


## MixIns

<!-- @vuese:TipTapEditor:mixIns:start -->
|MixIn|
|---|
|translate|

<!-- @vuese:TipTapEditor:mixIns:end -->


