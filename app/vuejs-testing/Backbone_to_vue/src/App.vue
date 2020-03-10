<template>
  <div id="app">
    <Editor
      ref='y86Editor'
      mode='y86'
      :initialValue='y86CodeSample'
    />
    <Editor
      ref='hclEditor'
      mode='hcl'
      :initialValue='hclCodeSample'
    />
  </div>
</template>

<script>
import Editor from './components/Editor.vue'

import hclCodeSample from '@/assets/code-samples/hcl.txt'
import y86CodeSample from '@/assets/code-samples/y86.txt'

export default {
  name: 'App',
  data () {
    return {
      hclCodeSample,
      y86CodeSample
    }
  },
  components: {
    Editor
  },
  methods: {
    getHclCode() {
      return this.$refs.hclEditor.getCode()
    },
    getY86Code() {
      return this.$refs.y86Editor.getCode()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
