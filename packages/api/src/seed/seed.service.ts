import { Injectable } from '@nestjs/common'
import { BuildingsService } from 'src/buildings/buildings.service'
import { Building } from 'src/buildings/entities/building.entity'

// import * as buildings from './data/buildings.json' // set  "resolveJsonModule": true in tsconfig.json
import buildings from './data/buildings.json'

@Injectable()
export class SeedService {
  constructor(private buildingsService: BuildingsService) {}

  async addBuildingsFromJson(): Promise<Building[]> {
    const theBuildings: Building[] = []
    for (const building of buildings as {
      name: string
      address: string
      description?: string
    }[]) {
      const b = new Building()
      b.name = building.name
      b.address = building.address
      b.description = building.description

      theBuildings.push(b)
    }

    return this.buildingsService.saveAll(theBuildings)
  }

  async deleteAllBuildings(): Promise<void> {
    return this.buildingsService.truncate()
  }
}
