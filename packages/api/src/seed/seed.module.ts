import { Module } from '@nestjs/common'
import { BuildingsModule } from 'src/buildings/buildings.module'
import { CommandModule } from 'nestjs-command'
import { SeedService } from './seed.service'
import { DatabaseSeedCommand } from './seed.command'

@Module({
  imports: [BuildingsModule, CommandModule],
  providers: [SeedService, DatabaseSeedCommand],
})
export class SeedModule {}
