import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Address } from './address.entity'

//   @Column() & @Entity()  // Database link - Typeorm
// @ObjectIdColumn() for automatically incremented ids in MongoDB.
// ⚠️ Don't use @PrimaryColumn() or @PrimaryGeneratedColumn(). These are reserved for relational databases!
// @CreateDateColumn({ type: 'timestamp', nullable: true }) to keep track when a document is created.
// @UpdateDateColumn({ type: 'timestamp', nullable: true }) to keep track when a document is updated.

@Entity() // Database link - Typeorm
@ObjectType()
export class Building {
  @ObjectIdColumn() // MongoDB uses ObjectId by default
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  name: string

  @Column()
  @Field(() => Address)
  address: Address

  @Column()
  @Field({ nullable: true })
  description?: string

  @CreateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field({ nullable: true }) // GraphQL
  createdAt?: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field({ nullable: true }) // GraphQL
  updatedAt?: Date
}
