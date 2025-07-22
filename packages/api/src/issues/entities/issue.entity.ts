import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
export class Issue {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Field()
  @Column()
  userUid: string

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  description: string

  // use enum later
  // @Field()
  // status: string

  @CreateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field({ nullable: true }) // GraphQL
  createdAt?: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field({ nullable: true }) // GraphQL
  updatedAt?: Date
}
