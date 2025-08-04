import { InputType, Int, Field } from '@nestjs/graphql'
import { RoundStatus } from '../entities/inspection-round.entity'
import { IsArray, IsDateString, IsString } from 'class-validator'

@InputType()
export class CreateInspectionRoundInput {
  @Field()
  @IsString()
  buildingId: string

  @Field()
  @IsString()
  assignedToUserId: string

  @Field()
  @IsDateString()
  plannedAt: Date

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  roomOrder: string[]

  @Field(() => RoundStatus, { defaultValue: RoundStatus.PLANNED })
  status: RoundStatus = RoundStatus.PLANNED
}
