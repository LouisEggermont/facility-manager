import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { RoundRoomProgressService } from './round-room-progress.service'
import { RoundRoomProgress } from './entities/round-room-progress.entity'
import { CreateRoundRoomProgressInput } from './dto/create-round-room-progress.input'
import { UpdateRoundRoomProgressInput } from './dto/update-round-room-progress.input'

@Resolver(() => RoundRoomProgress)
export class RoundRoomProgressResolver {
  constructor(
    private readonly roundRoomProgressService: RoundRoomProgressService,
  ) {}

  @Mutation(() => RoundRoomProgress)
  createRoundRoomProgress(
    @Args('createRoundRoomProgressInput')
    createRoundRoomProgressInput: CreateRoundRoomProgressInput,
  ) {
    return this.roundRoomProgressService.create(createRoundRoomProgressInput)
  }

  @Query(() => [RoundRoomProgress], { name: 'roundRoomProgress' })
  findAll() {
    return this.roundRoomProgressService.findAll()
  }

  @Query(() => RoundRoomProgress, { name: 'roundRoomProgress' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.roundRoomProgressService.findOne(id)
  }

  @Mutation(() => RoundRoomProgress)
  updateRoundRoomProgress(
    @Args('updateRoundRoomProgressInput')
    updateRoundRoomProgressInput: UpdateRoundRoomProgressInput,
  ) {
    return this.roundRoomProgressService.update(
      updateRoundRoomProgressInput.id,
      updateRoundRoomProgressInput,
    )
  }

  @Mutation(() => RoundRoomProgress)
  removeRoundRoomProgress(@Args('id', { type: () => Int }) id: number) {
    return this.roundRoomProgressService.remove(id)
  }
}
