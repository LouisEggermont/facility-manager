import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { InspectionRoundsService } from './inspection-rounds.service'
import { InspectionRound } from './entities/inspection-round.entity'
import { CreateInspectionRoundInput } from './dto/create-inspection-round.input'
import { UpdateInspectionRoundInput } from './dto/update-inspection-round.input'

@Resolver(() => InspectionRound)
export class InspectionRoundsResolver {
  constructor(
    private readonly inspectionRoundsService: InspectionRoundsService,
  ) {}

  @Mutation(() => InspectionRound)
  createInspectionRound(
    @Args('createInspectionRoundInput')
    createInspectionRoundInput: CreateInspectionRoundInput,
  ) {
    return this.inspectionRoundsService.create(createInspectionRoundInput)
  }

  @Query(() => [InspectionRound], { name: 'inspectionRounds' })
  findAll() {
    return this.inspectionRoundsService.findAll()
  }

  @Query(() => InspectionRound, { name: 'inspectionRound' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.inspectionRoundsService.findOne(id)
  }

  @Mutation(() => InspectionRound)
  updateInspectionRound(
    @Args('updateInspectionRoundInput')
    updateInspectionRoundInput: UpdateInspectionRoundInput,
  ) {
    return this.inspectionRoundsService.update(
      updateInspectionRoundInput.id,
      updateInspectionRoundInput,
    )
  }

  // @Mutation(() => InspectionRound)
  // removeInspectionRound(@Args('id', { type: () => String }) id: string) {
  //   return this.inspectionRoundsService.remove(id)
  // }
}
