import { Test, TestingModule } from '@nestjs/testing'
import { RoundRoomProgressService } from './round-room-progress.service'

describe('RoundRoomProgressService', () => {
  let service: RoundRoomProgressService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoundRoomProgressService],
    }).compile()

    service = module.get<RoundRoomProgressService>(RoundRoomProgressService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
