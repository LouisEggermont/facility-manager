import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { BuildingsSeeder } from './buildings.seed' // or wherever you placed it
import { RoomsSeeder } from './rooms.seed'
import { UsersSeeder } from './users.seed'

@Injectable()
export class DatabaseSeedCommand {
  constructor(
    private readonly buildingsSeeder: BuildingsSeeder,
    private readonly roomsSeeder: RoomsSeeder,
    private readonly usersSeeder: UsersSeeder,
  ) {}

  @Command({
    command: 'seed:database:all',
    describe: 'Seed all data to database',
  })
  async seedAll() {
    console.log('🌱 Seeding all data...')

    // Seed in dependency order
    const buildings = await this.buildingsSeeder.seed()
    console.log(`✅ Seeded ${buildings.length} buildings`)

    const rooms = await this.roomsSeeder.seed()
    console.log(`✅ Seeded ${rooms.length} rooms`)

    const users = await this.usersSeeder.seed()
    console.log(`✅ Seeded ${users.length} users`)

    console.log('🎉 All seeding complete!')
  }

  @Command({
    command: 'seed:reset:all',
    describe: 'Delete all data from the database',
  })
  async deleteAll() {
    console.log('🧨 Deleting all data...')

    await this.buildingsSeeder.deleteAll()
    await this.roomsSeeder.deleteAll()
    await this.usersSeeder.deleteAll()

    console.log('🗑️ Removed all data')
  }

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

  // Users commands
  @Command({
    command: 'seed:database:users',
    describe: 'Seed the database with users',
  })
  async seedUsers() {
    console.info('🚀 Start seeding of users...')
    const users = await this.usersSeeder.seed()
    console.info(`✅ ${users.length} users added`)
  }

  @Command({
    command: 'seed:reset:users',
    describe: 'Delete all users from the database',
  })
  async deleteUsers() {
    console.info('🧨 Deleting users...')
    await this.usersSeeder.deleteAll()
    console.info('🗑️ Removed users')
  }
}
