import { CreateRoundRoomProgressInput } from './create-round-room-progress.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateRoundRoomProgressInput extends PartialType(
  CreateRoundRoomProgressInput,
) {
  @Field(() => Int)
  id: number
}
