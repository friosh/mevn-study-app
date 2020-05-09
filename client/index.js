import Vue from 'vue'
import store from './store'
import Main from './pages/Main.vue'
import './css/main.css'
import Router from 'vue-router'
import router from './routes'
import flashMixin from './mixins/flash'

Vue.use(Router)
Vue.mixin(flashMixin)

const app = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(Main),
})
