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

<style src="../css/settingsDialog.css">

</style>
