import useFirebase from '@/composables/useFirebase'
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
    meta: { preventLoggedIn: true },
  },
  {
    path: '/logout',
    component: () => import('@/views/auth/LogoutScreen.vue'),
    // meta: { preventLoggedIn: true },
  },
  {
    path: '/register',
    component: () => import('@/views/auth/RegisterScreen.vue'),
    // meta: { preventLoggedIn: true },
  },
  {
    path: '/birds',
    component: () => import('@/views/birds/IndexView.vue'),
    meta: { shouldBeAuthenticated: true },
  },
  {
    path: '/birds/:slug',
    component: () => import('@/views/birds/_slug.vue'),
    meta: { shouldBeAuthenticated: true },
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

router.beforeEach(async (to, from, next) => {
  const { firebaseUser } = useFirebase()

  if (to.meta.shouldBeAuthenticated && !firebaseUser.value) {
    next({ path: '/login' })
  } else if (to.meta.preventLoggedIn && firebaseUser.value) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
