import { ObjectType, Field, InputType } from '@nestjs/graphql'
import { Column } from 'typeorm'

@ObjectType('Address')
@InputType('AddressInput')
export class Address {
  @Column()
  @Field()
  street: string

  @Column()
  @Field()
  number: string

  @Column()
  @Field()
  city: string

  @Column()
  @Field()
  zip: string

  @Column({ default: 'Belgium' })
  @Field({ defaultValue: 'Belgium' })
  country: string
}
