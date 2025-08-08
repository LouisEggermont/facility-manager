import useCustomUser from '@/composables/useCustomUser'
import {
  hasMinimumRole,
  canAccess,
  Role,
} from '@/interfaces/custom.user.interface'

type RoleBinding =
  | Role
  | {
      min?: Role
      allow?: Role[]
    }

export default {
  mounted(el: HTMLElement, binding: { value: RoleBinding }) {
    const { customUser } = useCustomUser()
    const userRole = customUser.value?.role

    let allowed = false
    const value = binding.value

    if (!userRole) return el.remove()

    if (typeof value === 'number') {
      allowed = hasMinimumRole(userRole, value)
    } else if (typeof value === 'object') {
      const { min, allow } = value
      if (min) allowed ||= hasMinimumRole(userRole, min)
      if (allow?.length) allowed ||= canAccess(userRole, allow)
    }

    // ❗ SAFER REMOVE: prevent layout/DOM errors
    if (!allowed) {
      el.style.display = 'none' // instead of `el.remove()`
    }
  },
}

// EXAMPLE USAGE:
// <!-- Minimum role required -->
// <span v-role="Role.ADMIN">Admins and up see this</span>

// <!-- Only these roles can see it -->
// <span v-role="{ allow: [Role.ADMIN, Role.CONCIERGE] }">Concierge or Admin only</span>

// <!-- Either minimum or specific roles -->
// <span v-role="{ min: Role.TEACHER, allow: [Role.SUPERADMIN] }">
//   Teachers and up, or Super Admins
// </span>
