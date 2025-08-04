import { CreateInspectionRoundInput } from './create-inspection-round.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateInspectionRoundInput extends PartialType(
  CreateInspectionRoundInput,
) {
  @Field(() => Int)
  id: number
}
