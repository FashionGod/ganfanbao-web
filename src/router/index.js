import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/user/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'miniProgram-management',
      hidden: true,
      component: () => import('@/views/miniProgram-management/index')
    },
  ]
})
