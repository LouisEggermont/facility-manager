import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { BuildingsSeeder } from './buildings.seed' // or wherever you placed it
import { RoomsSeeder } from './rooms.seed'

@Injectable()
export class DatabaseSeedCommand {
  constructor(
    private readonly buildingsSeeder: BuildingsSeeder,
    private readonly roomsSeeder: RoomsSeeder,
  ) {}

  // Buildings commands
  @Command({
    command: 'seed:database:buildings',
    describe: 'Seed the database with buildings',
  })
  async seedBuildings() {
    console.info('🚀 Start seeding of buildings...')
    const buildings = await this.buildingsSeeder.seed()
    console.info(`✅ ${buildings.length} buildings added`)
  }

  @Command({
    command: 'seed:reset:buildings',
    describe: 'Delete all data from the buildings collection',
  })
  async deleteBuildings() {
    console.info('🧨 Deleting buildings...')
    await this.buildingsSeeder.deleteAll()
    console.info('🗑️ Removed buildings')
  }

  // Rooms commands
  @Command({
    command: 'seed:database:rooms',
    describe: 'Seed the database with rooms',
  })
  async seedRooms() {
    console.info('🚀 Start seeding of rooms...')
    const rooms = await this.roomsSeeder.seed()
    console.info(`✅ ${rooms.length} rooms added`)
  }

  @Command({
    command: 'seed:reset:rooms',
    describe: 'Delete all rooms from the database',
  })
  async deleteRooms() {
    console.info('🧨 Deleting rooms...')
    await this.roomsSeeder.deleteAll()
    console.info('🗑️ Removed rooms')
  }
}
