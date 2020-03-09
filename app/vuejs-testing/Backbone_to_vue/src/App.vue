<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <editor
      ref="hey"
      mode='y86'
      :value='defaultY86Code'
    />
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Editor from './components/Editor.vue'

import defaultY86Code from '@/assets/default-y86.txt'


export default {
  name: 'App',
  data () {
    return {
      item: {},
      defaultY86Code: defaultY86Code
    }
  },
  components: {
    editor: Editor
  },
   methods: {
     // TODO find a better name
     getY86Code() {
       return this.$refs.hey.getCode()
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
