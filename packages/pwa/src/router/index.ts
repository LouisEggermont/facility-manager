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
    path: '/auth',
    component: () => import('@/components/wrappers/AuthWrapper.vue'),
    meta: { preventLoggedIn: true },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/LoginScreen.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/auth/RegisterScreen.vue'),
      },
    ],
  },
  {
    path: '/myaccount',
    name: 'myaccount',
    component: () => import('@/views/MyAccount.vue'),
  },
  {
    path: '/birds',
    name: 'birds',
    component: () => import('@/views/birds/IndexView.vue'),
    meta: { shouldBeAuthenticated: true },
  },
  {
    path: '/birds/:slug',
    name: 'birdbyslug',
    component: () => import('@/views/birds/_slug.vue'),
    meta: { shouldBeAuthenticated: true },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeScreen.vue'),
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
    next({ name: 'login' })
  } else if (to.meta.preventLoggedIn && firebaseUser.value) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
