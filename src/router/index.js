import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Gamble',
    component: () => import(/* webpackChunkName: "about" */ '../views/Gamble.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
