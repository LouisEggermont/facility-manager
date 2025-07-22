import { Module } from '@nestjs/common'
import { IssuesService } from './issues.service'
import { IssuesResolver } from './issues.resolver'

@Module({
  providers: [IssuesResolver, IssuesService],
})
export class IssuesModule {}
