import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Column } from 'typeorm'

export enum SeverityType {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

registerEnumType(SeverityType, {
  name: 'SeverityType',
  description: 'Severity level of the checklist item',
})

@ObjectType()
export class ChecklistItem {
  @Column()
  @Field()
  label: string

  @Column()
  @Field(() => SeverityType)
  severity: SeverityType
}
