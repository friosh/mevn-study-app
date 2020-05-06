import Vue from 'vue'
import store from './store'
import Main from './pages/Main.vue'
import './css/main.css'
import Router from 'vue-router'
import router from './routes'

Vue.use(Router)

const app = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(Main),
})
