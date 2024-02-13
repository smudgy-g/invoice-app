import HomeVue from '@/views/Home.vue'
import InvoiceView from '@/views/InvoiceView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeVue
    },
    {
      path: '/invoice/:invoiceId',
      name: 'invoice',
      component: InvoiceView
    },
    
  ]
})

export default router
