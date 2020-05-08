import Router from 'vue-router'

import Main from '@pages/Main.vue'
import Login from '@pages/Login.vue'
import Registration from '@pages/Register.vue'
import Home from '@pages/Home.vue'
import ForgotPassword from '@pages/ForgotPassword.vue'
import ResetPassword from '@pages/ResetPassword.vue'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/auth/login',
      component: Login,
    },
    {
      path: '/auth/register',
      component: Registration,
    },
    {
      path: '/auth/restore',
      component: ForgotPassword,
    },
    {
      path: '/auth/reset/:token',
      component: ResetPassword,
    },
  ],
})
