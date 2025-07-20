import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// ROUTES
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/auth/LoginScreen.vue'),
  },
  {
    path: '/birds',
    component: () => import('@/views/birds/IndexView.vue'),
  },
  {
    path: '/birds/:slug',
    component: () => import('@/views/birds/_slug.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
  },
]

// THE ROUTER ITSELF
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
