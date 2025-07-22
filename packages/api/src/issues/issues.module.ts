import { Module } from '@nestjs/common'
import { IssuesService } from './issues.service'
import { IssuesResolver } from './issues.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Issue } from './entities/issue.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Issue])],
  providers: [IssuesResolver, IssuesService],
})
export class IssuesModule {}
