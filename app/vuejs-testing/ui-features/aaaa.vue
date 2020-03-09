<script>
  import settingsFile from './js/Settings.js'

  var app = new Vue({
    el: '#app',
      data: {
        settings: settingsFile,
        strings: settingsFile.languages[settingsFile.ui.currentLanguage].strings
      },
    computed: {
      currentLanguage() {
        return this.settings.ui.currentLanguage
      }
    },
    watch: {
      currentLanguage (newLanguage) {
        this.strings = this.settings.languages[newLanguage].strings
      }
    }
  })

  var head = new Vue({
    el: 'head',
    methods: {
      getHeaderTitle: function () {
        return app.strings.headerTitle
      },
      getThemeFilename: function () {
        return app.settings.themes[app.settings.ui.currentTheme].filename
      }
    }
  })

  export default { app, head }
</script>
