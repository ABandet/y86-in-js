<template>
  <div class="vue" style="border: red 2px solid">
    <h1 class="header">SOURCE CODE</h1>
    <div class="editor"></div>
  </div>
</template>

<script>
//require('brace/mode/hcl.js')
require('brace/mode/y86.js')

import brace from 'brace'

export default {
  props: {
    mode: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    getCode() {
      return this.value
    }
  },
  mounted () {
    // Which element of the template should contain the editor
    this.$ace = brace.edit(this.$el.childNodes[1])

    require(`brace/mode/${this.mode}`)
    require('brace/theme/monokai')

    // Somehow using .setOptions() for the mode makes the editor read only
    this.$ace.getSession().setMode(`ace/mode/${this.mode}`)

    this.$ace.setOptions({
      theme: 'ace/theme/monokai',
      newLineMode: 'unix',
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      tabSize: 4,
      useSoftTabs: true,
      wrap: true,
      readOnly: false,
      printMargin: 80
    });

    // Set the initial content of the editor to the one provided to this.value
    this.$ace.setValue(this.value, 1)
  }
}
</script>

<style scoped>
.vue div {
  height: 300px;
}
</style>
