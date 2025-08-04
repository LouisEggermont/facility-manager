import { Test, TestingModule } from '@nestjs/testing'
import { InspectionRoundsResolver } from './inspection-rounds.resolver'
import { InspectionRoundsService } from './inspection-rounds.service'

describe('InspectionRoundsResolver', () => {
  let resolver: InspectionRoundsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InspectionRoundsResolver, InspectionRoundsService],
    }).compile()

    resolver = module.get<InspectionRoundsResolver>(InspectionRoundsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
