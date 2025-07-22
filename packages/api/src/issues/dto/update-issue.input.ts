import { CreateIssueInput } from './create-issue.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateIssueInput extends PartialType(CreateIssueInput) {
  @Field(() => String)
  id: string
}
