import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreateIssueInput {
  @IsNotEmpty()
  @Field()
  userUid: string

  @Field()
  @IsNotEmpty()
  title: string

  @Field()
  @IsNotEmpty()
  description: string
}
