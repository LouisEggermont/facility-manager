import { Injectable } from '@nestjs/common'
import * as users from './data/users.json'
import { User, Role } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class UsersSeeder {
  constructor(private readonly usersService: UsersService) {}

  async seed(): Promise<User[]> {
    const allUsers: User[] = []

    for (const u of users) {
      const user = new User()
      user.uid = u.uid
      user.locale = u.locale
      user.role = Role[u.role as keyof typeof Role]
      user.createdAt = new Date()
      user.updatedAt = new Date()

      allUsers.push(user)
    }

    return this.usersService.saveAll(allUsers)
  }

  async deleteAll(): Promise<void> {
    return this.usersService.truncate()
  }
}
