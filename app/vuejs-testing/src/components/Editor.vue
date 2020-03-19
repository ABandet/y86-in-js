<template>
  <div>
    <h1 class="header">{{ strings.title }}</h1>
    <div class="editor"></div>
  </div>
</template>

<script>
import brace from 'brace'

export default {
  props: {
    strings: {
      required: true
    },
    mode: {
      type: String,
      required: true
    },
    initialValue: {
      type: String,
      required: true
    }
  },
  methods: {
    getCode() {
      return this.editor.getValue()
    }
  },
  mounted () {
    // Which element of the template should contain the editor
    this.editor = brace.edit(this.$el.childNodes[1])

    // NOTE This only works for our home-made modes, builtins modes cannot be
    // loaded this way, use `brace/mode/${this.mode}` instead
    require(`@/assets/brace-modes/${this.mode}`)

    this.editor.setOptions({
      displayIndentGuides: true,
      fixedWidthGutter: true,
      highlightActiveLine: true,
      highlightGutterLine: true,
      mode: `ace/mode/${this.mode}`,
      newLineMode: 'unix',
      printMargin: 80,
      readOnly: false,
      showGutter: true,
      tabSize: 4,
      useSoftTabs: true,
      wrap: true
    })

    this.editor.setValue(this.initialValue, 1)
    this.editor.gotoLine(0);
  }
}
</script>

<style src="../css/editor.css">

</style>
