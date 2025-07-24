import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { Role, User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
// import { UpdateUserInput } from './dto/update-user.input'
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard'
import { CurrentFirebaseUser } from 'src/decorators/user.decorator'
import { UserInfo } from 'firebase-admin/auth'
import { AllowedRoles } from './decorators/roles.decorator'
import { RolesGuard } from './guards/roles.guard'
import { UpdateUserInput } from './dto/update-user.input'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // You can make this mutation more secure by using the @CurrentFirebaseUser decorator
  // This mutation allows a user to create their own account.
  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  createOwnUseraccount(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @CurrentFirebaseUser() user: UserInfo,
  ) {
    // You can only create a user for yourself
    // This is a security check. The uid of the authenticated Firebase user must match the uid of the user being created.
    if (user.uid !== createUserInput.uid) {
      throw new Error(
        // TODO: add i18n
        'User not authorized to create this user. You can only create users for yourself.',
      )
    }
    // You can only create a user with the role "user"
    if (createUserInput.role !== Role.USER) {
      throw new Error(
        // TODO: add i18n
        'User not authorized to create this user. You can only create users with the role "user".',
      )
    }

    return this.usersService.create(createUserInput)
  }

  @UseGuards(FirebaseGuard)
  @Query(() => User, { name: 'ownUseraccount' })
  ownUseraccount(@CurrentFirebaseUser() user: UserInfo) {
    return this.usersService.findOneByFirebaseUid(user.uid)
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput)
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll()
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id)
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput)
  // }

  @AllowedRoles(Role.USER, Role.ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentFirebaseUser() user: UserInfo,
  ) {
    // Get the role of the user
    const userRole = await this.usersService.findOneByFirebaseUid(user.uid)
    if (userRole && userRole.role === Role.USER) {
      if (updateUserInput.uid !== user.uid) {
        throw new Error(
          'User not authorized to update user. You can only update your own user account.',
        )
      }
      // You can only update your own user account, but only the locale field.
      return this.usersService.updateLocale(user.uid, updateUserInput.locale)
    } else if (userRole && userRole.role === Role.ADMIN) {
      // TODO: Implement the logic for admins to update any user account.
      // Admins can update any user account.
      throw new Error('Still to be implemented for Admins')
    } else {
      throw new Error('No userRole found')
    }
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id)
  }
}
