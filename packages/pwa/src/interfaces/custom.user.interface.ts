import type { Role } from './role.interface'

export interface CustomUser {
  id?: string
  uid: string
  locale?: string
  role: Role
  createdAt?: string
  updatedAt?: string
}
