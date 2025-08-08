// TODO: add translation support for role names

import { Role } from '@/interfaces/role.interface'

// TODO: actualy use this in the app
export const getRoleName = (role: Role): string => {
  switch (role) {
    case Role.USER:
      return 'User'
    case Role.STUDENT:
      return 'Student'
    case Role.TEACHER:
      return 'Teacher'
    case Role.CONCIERGE:
      return 'Concierge'
    case Role.FACILITY_MANAGER:
      return 'Facility Manager'
    case Role.ADMIN:
      return 'Admin'
    case Role.SUPERADMIN:
      return 'Super Admin'
    default:
      return 'Unknown'
  }
}

export const hasMinimumRole = (userRole: Role, requiredRole: Role): boolean => {
  return userRole >= requiredRole
}

export const canAccess = (userRole: Role, allowedRoles: Role[]): boolean => {
  return allowedRoles.includes(userRole)
}
// 🧠 Helper to convert string (from GraphQL) to enum
export const parseRole = (roleString: string): Role => {
  return Role[roleString as keyof typeof Role]
}
