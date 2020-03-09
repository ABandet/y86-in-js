var ComboBox = Vue.component('ComboBox', {
  props: {
    list: Array
  },
  template: `
    <select v-model="this.$root.settings.ui.current">
        <option v-for="item in list" :value="item">{{ item }}</option>
    </select>`
})
export default ComboBox;
