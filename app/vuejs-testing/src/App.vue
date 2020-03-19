<template>
  <div id="app">
    <link rel="stylesheet" type="text/css" :href="currentThemeFile">
    <Header
      :strings="strings"
      :settings="settings"
    />
    <!--<Tabs/>-->
    <div class="vertical-pane">
      <Editor ref="y86Editor" :strings="strings.Editor" mode="y86" :initialValue="y86CodeSample"/>
      <Editor ref="hclEditor" :strings="strings.Editor" mode="hcl" :initialValue="hclCodeSample"/>
    </div>
    <div class="vertical-pane">
      <div class="horizontal-pane">
        <CpuState ref="cpu-state" :jsonCpuStat="this.cpuStateJson"/>
        <div class="vertical-pane">
          <Registers ref="registers" :jsonReg="this.registersJson"/>
          <div class="horizontal-pane">
            <Flags ref="flags" :jsonFlags="this.flagsJson"/>
            <Status ref="status" :jsonStatus="this.statusJson"/>
          </div></div>
      </div>
      <ObjectCode ref="object-code" :obj-code="this.objectCodeSample" :err="errorsJson"/>
      <Memory ref="memory" :jsonMemory="this.memoryJson"/>
    </div>
  </div>
</template>

<script>
  import Editor from './components/Editor.vue'
  import Header from './components/Header.vue'
  import CpuState from './components/CpuState.vue'
  import Memory from "./components/Memory"
  import Registers from "./components/Registers"
  import Flags from "./components/Flags"
  import Status from "./components/Status"
  import ObjectCode from "./components/ObjectCode"
  //import Tabs from './components/Tabs.vue'

  import settings from '@/assets/settings.json'
  import cpuStateJson from '@/assets/json-data/cpu-state.json'
  import memoryJson from '@/assets/json-data/memory.json'
  import registersJson from '@/assets/json-data/registers.json'
  import flagsJson from '@/assets/json-data/flags.json'
  import statusJson from '@/assets/json-data/status.json'
  import errorsJson from '@/assets/json-data/errors.json'

  import hclCodeSample from '@/assets/code-samples/hcl.txt' // FIXME
  import y86CodeSample from '@/assets/code-samples/y86.txt' // FIXME
  import objectCodeSample from '@/assets/code-samples/object_code.txt' // FIXME

  import english from '@/assets/strings/en.json'
  import french from '@/assets/strings/fr.json'

  export default {
    name: 'App',
    data () {
      return {
        settings,
        strings: "",
        hclCodeSample, // FIXME
        y86CodeSample, // FIXME
        CpuState,
        cpuStateJson,
        Memory,
        memoryJson,
        Registers,
        registersJson,
        Flags,
        flagsJson,
        statusJson,
        ObjectCode,
        objectCodeSample,
        errorsJson
      }
    },
    components: {
      Editor, // FIXME
      Header,
      CpuState,
      ObjectCode,
      Flags,
      Memory,
      Registers,
      Status
      //Tabs
    },
    computed: {
      currentLanguage () {
        return settings.ui.currentLanguage
      },
      currentThemeFile () {
        return 'css/themes/' + settings.themes[settings.ui.currentTheme].filename
      }
    },
    methods: {
      getHclCode () {
        return this.$refs.hclEditor.getCode()
      },
      getY86Code () {
        return this.$refs.y86Editor.getCode()
      }
    },
    created () {
      // Load all the languages
      settings.languages[0].strings = english
      settings.languages[1].strings = french
      // Load the current language in the app
      this.strings = settings.languages[settings.ui.currentLanguage].strings
      document.title = this.strings.documentTitle
    },
    watch: {
      currentLanguage (newLanguage) {
        this.strings = settings.languages[newLanguage].strings
        document.title = this.strings.documentTitle
      }
    }
  }
</script>

<style src="./css/app.css">

</style>
