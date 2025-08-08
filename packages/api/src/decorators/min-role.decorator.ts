import { SetMetadata } from '@nestjs/common'
import { Role } from 'src/users/entities/user.entity'

export const MIN_ROLE_KEY = 'minRole'
export const MinRole = (role: Role) => SetMetadata(MIN_ROLE_KEY, role)
