// user.entity.ts
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

// export enum Role {
//   ADMIN = 'ADMIN',
//   USER = 'USER',
// }

export enum Role {
  USER = 45, // Can create rounds, assign rooms
  STUDENT = 50, // Can only report issues (DEFAULT)
  TEACHER = 100, // Can report issues and do requests
  CONCIERGE = 200, // Can update assigned rounds
  FACILITY_MANAGER = 500, // Can create rounds, assign staff
  ADMIN = 800, // Can manage users, delete rounds
  SUPERADMIN = 900, // Can create/manage everything
}
// ALWAYS change the values in the PWA based on this enum -> role.interfae.ts

// TODO: consider using a more complex enum for roles
registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
})

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
  @Field(() => Role)
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
