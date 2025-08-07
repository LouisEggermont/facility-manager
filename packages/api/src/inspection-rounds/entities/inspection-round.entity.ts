import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum RoundStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

registerEnumType(RoundStatus, {
  name: 'RoundStatus',
  description: 'Type of the room', // Optional
})

@ObjectType()
@Entity()
// Compound unique index for buildingId, plannedAt, and assignedToUserId
@Index(['buildingId', 'plannedAt', 'assignedToUserId'], {
  unique: true,
})
// Regular index for status and plannedAt for dashboard filtering
@Index(['status', 'plannedAt'])
export class InspectionRound {
  @ObjectIdColumn() // Database link - TypeORM
  @Field(() => ID) // GraphQL
  id: string

  @Field()
  @Column()
  name: string // Auto-generated

  @Field()
  @Column()
  buildingId: string

  @Field()
  @Column()
  assignedToUserId: string

  @Field()
  @Column()
  plannedAt: Date

  @Column({ nullable: true, type: 'simple-array' }) // Database link - Typeorm
  @Field(() => [String], { nullable: true }) // GraphQL type
  roomOrder: string[]

  @Field(() => RoundStatus)
  @Column()
  status: RoundStatus

  @Field({ nullable: true })
  @Column({ nullable: true })
  startedAt?: Date

  @Field({ nullable: true })
  @Column({ nullable: true })
  completedAt?: Date

  @CreateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field({ nullable: true }) // GraphQL
  createdAt?: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true }) // Add this
  @Field({ nullable: true }) // Add this
  updatedAt?: Date

  // Auto-generate name before saving
  @BeforeInsert()
  @BeforeUpdate()
  generateName() {
    if (this.roomOrder && this.roomOrder.length > 0 && this.plannedAt) {
      // Extract building prefix from room codes (e.g., "KWE.P" from "KWE.P.-1.011")
      const buildingPrefix = this.extractBuildingPrefix(this.roomOrder[0])

      // Format date (e.g., "2025-08-04")
      const dateStr = this.plannedAt.toISOString().split('T')[0]

      // Generate name: "KWE.P Round - 2025-08-04 (5 rooms)"
      this.name = `${buildingPrefix} Round - ${dateStr} (${this.roomOrder.length} rooms)`
    }
  }

  private extractBuildingPrefix(roomCode: string): string {
    // Extract building prefix from room code (e.g., "KWE.P" from "KWE.P.-1.011")
    const parts = roomCode.split('.')
    if (parts.length >= 2) {
      return `${parts[0]}.${parts[1]}`
    }
    return parts[0] || 'Building'
  }
}
