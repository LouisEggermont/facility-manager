import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  @Command({
    command: 'seed:database:buildings',
    describe: 'Seed the database with buildings',
  })
  async seedBuildings() {
    console.info('Start seeding of buildings')
    const buildings = await this.seedService.addBuildingsFromJson()
    console.info(`${buildings.length} Buildings are added`)
  }

  @Command({
    command: 'seed:reset:buildings',
    describe: 'Delete all data from the buildings table',
  })
  async delete() {
    console.info('Start deleting buildings')
    await this.seedService.deleteAllBuildings()
    console.info('Removed buildings')
  }
}
