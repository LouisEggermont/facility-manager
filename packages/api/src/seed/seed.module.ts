import { Module } from '@nestjs/common'
import { BuildingsModule } from 'src/buildings/buildings.module'
import { CommandModule } from 'nestjs-command'
import { DatabaseSeedCommand } from './seed.command'
import { BuildingsSeeder } from './buildings.seed'
import { RoomsSeeder } from './rooms.seed'
import { RoomsModule } from 'src/rooms/rooms.module'
import { UsersSeeder } from './users.seed'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [BuildingsModule, RoomsModule, UsersModule, CommandModule],
  providers: [BuildingsSeeder, RoomsSeeder, UsersSeeder, DatabaseSeedCommand],
})
export class SeedModule {}
