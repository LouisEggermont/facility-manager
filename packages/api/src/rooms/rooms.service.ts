import { Injectable } from '@nestjs/common'
import { CreateRoomInput } from './dto/create-room.input'
import { UpdateRoomInput } from './dto/update-room.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Room } from './entities/room.entity'
import { MongoRepository } from 'typeorm'

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepo: MongoRepository<Room>,
  ) {}

  // create(createRoomInput: CreateRoomInput) {
  //   return 'This action adds a new room'
  // }
  async create(input: CreateRoomInput): Promise<Room> {
    const room = this.roomRepo.create(input)
    return await this.roomRepo.save(room)
  }

  findAll() {
    return `This action returns all rooms`
  }

  findOne(id: number) {
    return `This action returns a #${id} room`
  }

  update(id: number, updateRoomInput: UpdateRoomInput) {
    return `This action updates a #${id} room`
  }

  remove(id: number) {
    return `This action removes a #${id} room`
  }
}
