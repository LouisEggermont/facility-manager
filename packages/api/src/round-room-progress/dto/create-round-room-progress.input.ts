import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateRoundRoomProgressInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
