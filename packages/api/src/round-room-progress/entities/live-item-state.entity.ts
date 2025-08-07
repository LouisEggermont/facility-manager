import { Field, ObjectType } from '@nestjs/graphql'
import { SeverityType } from 'src/common/severity-type.enum'
import { Column } from 'typeorm'

@ObjectType()
export class LiveItemState {
  @Field()
  @Column()
  label: string

  @Field(() => SeverityType)
  @Column()
  severity: SeverityType

  @Field()
  @Column()
  ok: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  notes?: string
}
