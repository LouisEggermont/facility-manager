import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
// import { UpdateUserInput } from './dto/update-user.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Role, User } from './entities/user.entity'
import { MongoRepository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    // If the user already exists, throw an error
    if (await this.findOneByFirebaseUid(createUserInput.uid)) {
      throw new Error(
        'User not authorized to create this user. A Firebase user is already connected to an account.',
      )
    }

    const newCustomUser = new User()
    if (createUserInput.locale) {
      newCustomUser.locale = createUserInput.locale
    }
    newCustomUser.role = Role.USER // This is a security feature. We only allow users to create users with the role "user"
    newCustomUser.uid = createUserInput.uid // Firebase UID is saved in the user entity
    return this.userRepository.save(newCustomUser)
  }

  findOneByFirebaseUid(uid: string) {
    return this.userRepository.findOneBy({ where: { uid: uid } })
  }

  // create(createUserInput: CreateUserInput) {
  //   return 'This action adds a new user'
  // }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`
  // }

  async updateLocale(uid: string, locale: string) {
    const user = await this.userRepository.findOneBy({
      where: { uid: uid },
    })
    if (!user) {
      throw new Error('User not found')
    }

    if (locale) {
      user.locale = locale
    }

    return this.userRepository.save(user)
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
