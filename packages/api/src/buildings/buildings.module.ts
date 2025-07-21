import { Module } from '@nestjs/common'
import { BuildingsService } from './buildings.service'
import { BuildingsResolver } from './buildings.resolver'

@Module({
  providers: [BuildingsResolver, BuildingsService],
})
export class BuildingsModule {}
