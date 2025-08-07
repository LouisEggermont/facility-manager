import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { SeverityType } from 'src/common/severity-type.enum'
import { Column } from 'typeorm'

// TODO: change name of this file to checklist-item.entity.ts
@ObjectType()
export class ChecklistItem {
  @Column()
  @Field()
  label: string

  @Column()
  @Field(() => SeverityType)
  severity: SeverityType
}
export { SeverityType }
