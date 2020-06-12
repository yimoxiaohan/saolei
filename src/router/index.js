import Vue from 'vue'
import Router from 'vue-router'
import SaoLei from '@/components/SaoLei'
import Demo1 from '@/components/Demo1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SaoLei',
      component: SaoLei
    },
    {
      path: '/Demo1',
      name: 'Demo1',
      component: Demo1
    }
  ]
})
