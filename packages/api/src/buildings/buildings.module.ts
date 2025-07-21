import { Module } from '@nestjs/common'
import { BuildingsService } from './buildings.service'
import { BuildingsResolver } from './buildings.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Building } from './entities/building.entity'

@Module({
  providers: [BuildingsResolver, BuildingsService],
  imports: [TypeOrmModule.forFeature([Building])],
  exports: [BuildingsService],
})
export class BuildingsModule {}
