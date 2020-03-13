/* FINISHED */
/* Based on: https://vuejsexamples.com/slim-dialog-for-vuejs/ */
<template>
  <!-- TODO update the links in about -->
  <transition name="show-dialog">
    <div id="dialog-container" @click="$emit('close')">
      <div id="center-dialog-vertically">
        <div id="dialog-window" v-on:click.stop>

          <button id="close-button" @click="$emit('close')">
            <i class="fa fa-times"></i>
          </button>

          <div>
            <h1>{{ strings.about }}</h1>
            <p>
              <i class="fa fa-code"></i>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/xsznix/js-y86/tree/master/samples">{{ strings.codeSamples }}</a>
            </p>
            <p>
              <i class="fa fa-file-alt"></i>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/xsznix/js-y86/wiki">{{ strings.documentation }}</a>
            </p>
            <p>
              <i class="fab fa-github"></i>
              <a target="_blank" rel="noopener noreferrer" href="">{{ strings.sourceCode }}</a>
            </p>
          </div>

          <div>
            <h1>{{ strings.settings }}</h1>
            <p>
              <i class="fa fa-language"></i>
              <span>{{ strings.language }}</span>
              <select v-model="settings.ui.currentLanguage">
                <option v-for="language in settings.languages" :key="language.id" :value="language.id">
                  {{ language.name }}
                </option>
              </select>
            </p>
            <p>
              <i class="fa fa-paint-roller"></i>
              <span>{{ strings.theme }}</span>
              <select v-model="settings.ui.currentTheme">
                <option v-for="theme in settings.themes" :key="theme.id" :value="theme.id">
                  {{ theme.name }}
                </option>
              </select>
            </p>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'SettingsDialog',
    props: {
      strings: {
        type: Object,
        required: true
      },
      settings: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  #dialog-container {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    display: table;
    width: 100%;
    height: 100%;
    background-color: var(--SettingsDialog-container-background);
    transition: opacity 0.3s ease;
  }

  #center-dialog-vertically {
    display: table-cell;
    vertical-align: middle;
  }

  #dialog-window {
    width: 400px;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: var(--SettingsDialog-background);
    color: var(--SettingsDialog-foreground);
    transition: all 0.3s ease;
  }

  #dialog-window > div:not(:nth-child(2)) {
    margin-top: 50px;
  }

  #dialog-window > div > h1 {
    border-bottom: 1px solid var(--SettingsDialog-heading-foreground);
    color: var(--SettingsDialog-heading-foreground);
    font-size: 30px;
  }

  #dialog-window > div > p {
    padding-left: 20px;
  }

  #dialog-window > div > p > * {
    color: var(--SettingsDialog-foreground);
    font-size: 18px;
  }

  #dialog-window > div > p > i {
    width: 30px;
    text-align: center;
    padding-right: 10px;
    color: var(--SettingsDialog-icon-foreground);
  }

  #dialog-window > div > p > select {
    float: right;
    margin-top: -4px;
    width: 140px;
    padding: 4px 0;
    text-indent: 6px;
    background-color: var(--SettingsDialog-select-background);
    text-shadow: 0 0 var(--SettingsDialog-select-foreground);
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  #close-button {
    position: relative;
    bottom: 10px;
    left: 20px;
    float: right;
    padding: 4px 8px;
    border: none;
    border-radius: 100%;
    background-color: var(--SettingsDialog-close-button-background);
    color: var(--SettingsDialog-close-button-foreground);
  }

  /* Vue transition properties */

  .show-dialog-enter {
    opacity: 0;
  }

  .show-dialog-leave-active {
    opacity: 0;
  }
</style>
