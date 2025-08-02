import { InputType, Field } from '@nestjs/graphql'
import { Address } from '../entities/address.entity'

@InputType()
export class CreateBuildingInput {
  @Field()
  name: string

  @Field(() => Address)
  address: Address

  @Field({ nullable: true })
  description?: string
}
