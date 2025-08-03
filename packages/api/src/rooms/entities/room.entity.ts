import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm'
import { ChecklistItem } from './checkListItem.entity'
import { ObjectId } from 'mongodb'
import { register } from 'module'

export enum RoomType {
  CLASSROOM = 'CLASSROOM',
  LAB = 'LAB',
  AULA = 'AULA',
  STORAGE = 'STORAGE',
}

registerEnumType(RoomType, {
  name: 'RoomType',
  description: 'Type of the room', // Optional
})

@ObjectType()
@Entity()
export class Room {
  @ObjectIdColumn() // Database link - TypeORM
  @Field(() => ID) // GraphQL
  id: string

  @Field()
  @Column()
  code: string

  @Field()
  @Column()
  buildingId: string

  // TODO: consider if we need buildingName
  // @Field()
  // @Column()
  // buildingName: string

  @Field(() => RoomType)
  @Column()
  type: RoomType

  @Field()
  @Column()
  floor: number

  @Field(() => [ChecklistItem])
  @Column()
  checklistItems: ChecklistItem[]

  @CreateDateColumn()
  createdAt: Date
}
