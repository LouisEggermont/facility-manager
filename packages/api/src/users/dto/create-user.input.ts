// dto/create-user.input.ts
import { InputType, Field } from '@nestjs/graphql'
import { Role } from '../entities/user.entity'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  uid: string // Firebase UID

  @Field({ nullable: true })
  locale?: string

  @IsEnum(Role)
  @Field(() => String)
  role: Role
}
