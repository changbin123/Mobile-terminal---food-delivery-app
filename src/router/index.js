import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index/goodschild'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children:[
      {path: '/index/goodschild', component: () => import('../views/index/GoodsChild')},
      {path: '/index/merchant', component: () => import('../views/index/Merchant')},
      {path: '/index/ratings', component: () => import('../views/index/Ratings')}
    ]
  },
  {
    path: '/goods',
    name: 'goods',
    component: () => import('../views/Goods')
  }
]

const router = new VueRouter({
  routes
})

export default router
