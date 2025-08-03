import { ConflictException, Injectable } from '@nestjs/common'
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

  // Function for seeding
  saveAll(rooms: Room[]): Promise<Room[]> {
    return this.roomRepo.save(rooms)
  }

  truncate(): Promise<void> {
    return this.roomRepo.clear()
  }

  // create(createRoomInput: CreateRoomInput) {
  //   return 'This action adds a new room'
  // }
  async create(input: CreateRoomInput): Promise<Room> {
    try {
      const room = this.roomRepo.create(input)
      return await this.roomRepo.save(room)
    } catch (error) {
      if (error?.code === 11000) {
        throw new ConflictException(
          `Room code "${input.code}" already exists in this building`,
        )
      }
      throw error
    }
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
