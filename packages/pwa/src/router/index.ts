import useCustomUser from '@/composables/useCustomUser'
import useFirebase from '@/composables/useFirebase'
import { Role } from '@/interfaces/role.interface'
import { canAccess, hasMinimumRole } from '@/utils/role.helpers'
import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// ROUTES
//   requiredRole: Role.ADMIN,                // option 1
//   allowedRoles: [Role.TEACHER, Role.FACILITY_MANAGER], // option 2
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
    path: '/buildings',
    name: 'buildings',
    component: () => import('@/views/buildings/IndexView.vue'),
    meta: { shouldBeAuthenticated: true, requiredRole: Role.ADMIN },
  },
  {
    path: '/issues',
    name: 'issues',
    component: () => import('@/views/issues/IndexView.vue'),
    meta: { shouldBeAuthenticated: true },
  },
  {
    path: '/buildings/:slug',
    name: 'buildingbyslug',
    component: () => import('@/views/buildings/_slug.vue'),
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
  // const { firebaseUser } = useFirebase()

  // if (to.meta.shouldBeAuthenticated && !firebaseUser.value) {
  //   next({ name: 'login' })
  // } else if (to.meta.preventLoggedIn && firebaseUser.value) {
  //   next({ name: 'home' })
  // } else {
  //   next()
  // }

  const { firebaseUser } = useFirebase()
  const { customUser } = useCustomUser()

  const requiresAuth = to.meta.shouldBeAuthenticated
  const preventWhenLoggedIn = to.meta.preventLoggedIn
  const requiredRole = to.meta.requiredRole as Role | undefined
  const allowedRoles = to.meta.allowedRoles as Role[] | undefined

  console.log('[Router Guard] Role:', customUser.value?.role)

  if (requiresAuth && !firebaseUser.value) {
    return next({ name: 'login' })
  }

  if (preventWhenLoggedIn && firebaseUser.value) {
    return next({ name: 'home' })
  }

  if (requiredRole || allowedRoles) {
    const role = customUser.value?.role
    const hasAccess =
      (!!requiredRole &&
        role !== undefined &&
        hasMinimumRole(role, requiredRole)) ||
      (!!allowedRoles && role !== undefined && canAccess(role, allowedRoles))

    if (!hasAccess) return next({ name: 'home' }) // or 403 page
  }

  next()
})

export default router
