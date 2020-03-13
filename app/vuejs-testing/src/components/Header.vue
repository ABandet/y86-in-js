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

<style>
  #header {
    display: flex;
    padding: 6px;
    background-color: var(--Header-background);
    color: var(--Header-foreground);
  }

  #header > div > * {
    margin: 0 4px;
  }

  #left-group {
    flex: 1;
  }

  #left-group,
  #right-group {
    display: flex;
    align-items: center;
  }

  #header #title {
    margin-bottom: -4px;
    padding: 0 10px;
    font-size: 24px;
  }

  #header > div > button,
  #SettingsDialog-button {
    padding: 6px 10px;
    background-color: var(--HeaderButton-enabled-background);
    color: var(--HeaderButton-enabled-foreground);
    font-size: 16px;
    transition-duration: all .3s;
    transition: opacity .5s;
    opacity: 1;
  }

  #header > div > button:hover,
  #SettingsDialog-button:hover {
    box-shadow: 3px 3px 0 0 var(--HeaderButton-hover-shadow);
  }

  #header > div > button:disabled {
    cursor: default;
    opacity: 0;
  }

  #header > div > button > i {
    font-size: 16px;
  }

  #header > #left-group > button > i {
    padding-right: 8px;
  }
</style>
