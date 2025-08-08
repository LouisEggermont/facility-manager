export enum Role {
  STUDENT = 50, // Can only report issues (DEFAULT)
  USER = 49,
  TEACHER = 100,
  CONCIERGE = 200,
  FACILITY_MANAGER = 500,
  ADMIN = 800,
  SUPERADMIN = 900,
}

export interface CustomUser {
  id?: string
  uid: string
  locale?: string
  role: Role
  createdAt?: string
  updatedAt?: string
}

// TODO: add translation support for role names
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
