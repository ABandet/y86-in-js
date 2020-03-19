<template>
  <div id="header">

    <div id="left-group">

      <span id="title">{{ strings.Header.title }}</span>

      <HeaderButton
        icon="bolt"
        :title="strings.Header.HeaderButton.assemble"
        @click="appAssemble()"
      />

      <HeaderButton
        icon="redo"
        :title="strings.Header.HeaderButton.reset"
        @click="appReset()"
      />

      <HeaderButton
        icon="angle-right"
        :title="strings.Header.HeaderButton.step"
        @click="appStep()"
      />

      <HeaderButton
        icon="angle-double-right"
        :title="strings.Header.HeaderButton.continue"
        @click="appContinue()"
      />

      <HeaderButton
        icon="file"
        :title="strings.Header.HeaderButton.load"
        @click="appLoad()"
      />

      <HeaderButton
        icon="save"
        :title="strings.Header.HeaderButton.save"
        @click="appSave()"
      />

    </div>

    <div id="right-group">

      <button id="SettingsDialog-button" @click="showSettingsDialog = true">
        <i class="fa fa-cog"></i>
      </button>

      <img src="@/assets/images/branding.png"/>

    </div>

    <SettingsDialog
      :strings="strings.SettingsDialog"
      :settings="settings"
      v-if="showSettingsDialog"
      @close="showSettingsDialog = false"
    />

  </div>
</template>

<script>
  import HeaderButton from './HeaderButton.vue'
  import SettingsDialog from './SettingsDialog.vue'

  export default {
    name: 'Header',
    props: {
      strings: {
        required: true
      },
      settings: {
        required: true
      }
    },
    data () {
      return {
        showSettingsDialog: false
      }
    },
    components: {
      HeaderButton,
      SettingsDialog
    },
    methods: { // TODO
      appAssemble () {
        console.log('ASSEMBLE')
      },
      appReset () {
        console.log('RESET')
      },
      appStep () {
        console.log('STEP')
      },
      appContinue () {
        console.log('CONTINUE')
      },
      appLoad () {
        console.log('LOAD')
      },
      appSave () {
        console.log('SAVE')
      }
    }
  }
</script>

<style src="../css/header.css">

</style>
