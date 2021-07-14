import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "@/assets/styles.css"

import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'
Vue.use(VModal)

import Values from '@/components/Values'
Vue.component('values', Values)

import Addvalues from '@/components/Addvalues'
Vue.component('addvalues', Addvalues)

import Valtable from '@/components/Valtable'
Vue.component('valtable', Valtable)

import Principles from '@/components/Principles'
Vue.component('principles', Principles)

import Pritable from '@/components/Pritable'
Vue.component('pritable', Pritable)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
