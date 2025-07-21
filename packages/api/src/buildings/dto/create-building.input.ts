import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateBuildingInput {
  @Field()
  name: string

  @Field()
  address: string

  @Field({ nullable: true, defaultValue: 'no description' })
  description?: string
}
