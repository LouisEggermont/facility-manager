import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'
import { LiveItemState } from './live-item-state.entity'

export enum RoomStatus {
  OPEN = 'OPEN',
  OK = 'OK',
  PROBLEM = 'PROBLEM',
}
registerEnumType(RoomStatus, { name: 'RoomStatus' })

@ObjectType()
@Entity()
export class RoundRoomProgress {
  @ObjectIdColumn() // Database link - TypeORM
  @Field(() => ID) // GraphQL
  id: string

  @Field()
  @Column()
  roundId: string // FK → InspectionRound

  @Field()
  @Column()
  roomId: string // FK → Room

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  checkedAt?: Date // when room was completed

  @Field(() => RoomStatus)
  @Column()
  status: RoomStatus = RoomStatus.OPEN // overall status: OK / PROBLEM / OPEN

  /** LIVE checklist – label is the key */
  @Field(() => [LiveItemState])
  @Column()
  items: LiveItemState[]
}
