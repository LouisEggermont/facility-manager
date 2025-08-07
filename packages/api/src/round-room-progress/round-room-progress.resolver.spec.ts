import { Test, TestingModule } from '@nestjs/testing'
import { RoundRoomProgressResolver } from './round-room-progress.resolver'
import { RoundRoomProgressService } from './round-room-progress.service'

describe('RoundRoomProgressResolver', () => {
  let resolver: RoundRoomProgressResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoundRoomProgressResolver, RoundRoomProgressService],
    }).compile()

    resolver = module.get<RoundRoomProgressResolver>(RoundRoomProgressResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
