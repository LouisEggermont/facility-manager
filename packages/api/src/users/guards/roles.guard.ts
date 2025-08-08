import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Role } from '../entities/user.entity'
import { UsersService } from '../users.service'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { MIN_ROLE_KEY } from 'src/decorators/min-role.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check for exact roles (existing functionality)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    // Check for minimum role (new functionality)
    const minRole = this.reflector.getAllAndOverride<Role>(MIN_ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    // if (!requiredRoles) {
    //   console.log('no AllowedRoles() decorator found, so no roles required')
    //   // TODO:
    //   //if you want to allow access to everyone if the decorator  MyRoles() is not set, you can RETURN TRUE here instead of throwing an error
    //   return true
    //   //however, I think it's better to throw an error, because it forces you to think about the roles
    //   // throw new Error('no AllowedRoles() decorator found, so no roles required')
    // }

    // If neither decorator is present, deny access (secure by default)
    if (!requiredRoles && minRole === undefined) {
      console.log('❌ No role authorization found - DENYING ACCESS')
      throw new ForbiddenException(
        'This endpoint requires explicit role authorization',
      )
    }

    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext().req
    console.log('🚪 Checking user permissions')
    console.log('🙋‍♂️ User:', user)

    const userEntity = await this.usersService.findOneByFirebaseUid(user.uid)
    const userRole = userEntity.role
    console.log('👤 User role:', `${Role[userRole]} (${userRole})`)

    // Check exact roles first (if specified)
    if (requiredRoles) {
      console.log(
        '🎯 Required exact roles:',
        requiredRoles.map(r => `${Role[r]} (${r})`),
      )
      const hasExactRole = requiredRoles.includes(userRole)
      console.log('✅ Has exact role:', hasExactRole)
      return hasExactRole
    }

    // Check minimum role (if specified)
    if (minRole !== undefined) {
      console.log('📊 Minimum role required:', `${Role[minRole]} (${minRole})`)
      console.log('📊 User role level:', `${Role[userRole]} (${userRole})`)
      const hasMinRole = userRole >= minRole
      console.log('✅ Meets minimum role:', hasMinRole)
      return hasMinRole
    }

    return false
  }
}
