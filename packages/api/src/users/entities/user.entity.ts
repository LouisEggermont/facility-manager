// user.entity.ts
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// TODO: consider using a more complex enum for roles
// registerEnumType(Role, {
//   name: 'Role',
//   description: 'User role',
// })

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn() // Database link - TypeORM
  @Field(() => ID) // GraphQL
  id: string

  @Column()
  @Field()
  uid: string // Firebase UID

  @Column()
  @Field({ nullable: true }) // Can return null in GraphQL if the user has no locale
  locale?: string

  @Column({ default: Role.USER })
  @Field(() => String)
  role: Role
  // @Field(() => Role) // with registerEnumType
  // role: Role

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt?: Date
}
