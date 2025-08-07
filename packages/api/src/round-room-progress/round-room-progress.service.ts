import { Injectable } from '@nestjs/common'
import { CreateRoundRoomProgressInput } from './dto/create-round-room-progress.input'
import { UpdateRoundRoomProgressInput } from './dto/update-round-room-progress.input'

@Injectable()
export class RoundRoomProgressService {
  create(createRoundRoomProgressInput: CreateRoundRoomProgressInput) {
    return 'This action adds a new roundRoomProgress'
  }

  findAll() {
    return `This action returns all roundRoomProgress`
  }

  findOne(id: number) {
    return `This action returns a #${id} roundRoomProgress`
  }

  update(
    id: number,
    updateRoundRoomProgressInput: UpdateRoundRoomProgressInput,
  ) {
    return `This action updates a #${id} roundRoomProgress`
  }

  remove(id: number) {
    return `This action removes a #${id} roundRoomProgress`
  }
}
