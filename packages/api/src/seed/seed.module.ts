import { Module } from '@nestjs/common'
import { BuildingsModule } from 'src/buildings/buildings.module'
import { CommandModule } from 'nestjs-command'
import { DatabaseSeedCommand } from './seed.command'
import { BuildingsSeeder } from './buildings.seed'
import { RoomsSeeder } from './rooms.seed'
import { RoomsModule } from 'src/rooms/rooms.module'

@Module({
  imports: [BuildingsModule, RoomsModule, CommandModule],
  providers: [BuildingsSeeder, RoomsSeeder, DatabaseSeedCommand],
})
export class SeedModule {}
