import { InputType, Int, Field } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { RoomType } from '../entities/room.entity'
import { SeverityType } from '../entities/checkListItem.entity'

@InputType()
export class CreateRoomInput {
  @Field() code: string
  @Field() buildingId: string
  // @Field() buildingName: string
  @Field(() => RoomType)
  type: RoomType
  @Field() floor: number

  @Field(() => [ChecklistItemInput])
  checklistItems: ChecklistItemInput[]
}

@InputType()
export class ChecklistItemInput {
  @Field() label: string
  @Field(() => SeverityType)
  severity: SeverityType
}
