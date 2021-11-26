import Vue from 'vue'
import Router from 'vue-router'
import error from '@/components/error'
import admin from '@/components/admin'
import ticketViewer from '@/components/ticketViewer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/error',
      name: 'error',
      component: error
    },
    {
      path: '/ticketViewer',
      name: 'ticketViewer',
      component: ticketViewer
    },
  ]
})
