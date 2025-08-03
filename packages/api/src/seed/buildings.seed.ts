import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import * as buildings from './data/buildings.json'
import { BuildingsService } from 'src/buildings/buildings.service'
import { Building } from 'src/buildings/entities/building.entity'

@Injectable()
export class BuildingsSeeder {
  constructor(private readonly buildingsService: BuildingsService) {}

  async seed(): Promise<Building[]> {
    const theBuildings: Building[] = []

    for (const building of buildings) {
      const b = new Building()
      if (building.id) {
        b._id = new ObjectId(building.id)
      }
      b.name = building.name
      b.address = building.address
      b.description = building.description

      theBuildings.push(b)
    }

    return this.buildingsService.saveAll(theBuildings)
  }

  async deleteAll(): Promise<void> {
    return this.buildingsService.truncate()
  }
}
