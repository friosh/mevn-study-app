import Vue from 'vue'
import Vuex from 'vuex'
import api from '@client/utils/axios'
import utils from '@client/utils/store.utils'
import auth from './auth'
import flash from './flash/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    flash,
  },
})
