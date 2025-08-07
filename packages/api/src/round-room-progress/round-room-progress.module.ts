import { Module } from '@nestjs/common'
import { RoundRoomProgressService } from './round-room-progress.service'
import { RoundRoomProgressResolver } from './round-room-progress.resolver'

@Module({
  providers: [RoundRoomProgressResolver, RoundRoomProgressService],
})
export class RoundRoomProgressModule {}
