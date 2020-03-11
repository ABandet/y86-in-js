import Vue from 'vue'

import App from './App.vue'

Vue.config.productionTip = false


// Allows calling app's methods in a convenient way: app.getY86Code()
window.app = new Vue({
  render: h => h(App)
}).$mount('#app').$children[0]
