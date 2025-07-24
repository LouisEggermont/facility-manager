import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'
import { Role } from '../entities/user.entity'

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  uid: string // Firebase UID

  @IsOptional()
  @Field({ nullable: true })
  locale?: string

  @IsOptional()
  @IsEnum(Role)
  @Field(() => String, { nullable: true })
  role?: Role
}
