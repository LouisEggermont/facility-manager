import { Injectable } from '@nestjs/common'
import { CreateBuildingInput } from './dto/create-building.input'

import { InjectRepository } from '@nestjs/typeorm'
import { Building } from './entities/building.entity'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb' // From mongodb package; NOT form typeorm !!!

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private buildingRepository: MongoRepository<Building>,
  ) {}

  // Function for seeding
  saveAll(buildings: Building[]): Promise<Building[]> {
    return this.buildingRepository.save(buildings)
  }

  truncate(): Promise<void> {
    return this.buildingRepository.clear()
  }

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // create(createBuildingInput: CreateBuildingInput) {
  //   return 'This action adds a new building'
  // }

  create(createBuildingInput: CreateBuildingInput): Promise<Building> {
    const building = new Building()
    building.name = createBuildingInput.name
    building.address = createBuildingInput.address
    building.description = createBuildingInput.description

    return this.buildingRepository.save(building)
  }

  // findAll() {
  //   return `This action returns all buildings`
  // }

  findAll() {
    return this.buildingRepository.find()
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} building`
  // }
  findOne(id: string) {
    // EXTRA STEP check if id is a valid ObjectId
    if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId')

    const objID = new ObjectId(id)
    return this.buildingRepository.findOneByOrFail({ id: objID })
  }

  // EXTRA
  async findOneByName(name: string): Promise<Building> {
    const building = await this.buildingRepository.findOne({ where: { name } })
    if (!building) {
      throw new Error(`Building with name "${name}" not found`)
    }
    return building
  }

  // // EXTRA
  // findBuildingsByCategory(category: string): Promise<Building[]> {
  //   return this.buildingRepository.find({ where: { category } })
  // }

  // // EXTRA
  // async incrementObservationsCount(buildingId: string): Promise<void> {
  //   const building = await this.findOne(buildingId)
  //   this.buildingRepository.update(
  //     { id: buildingId },
  //     { observations: building.observations + 1 },
  //   )
  // }

  // TODO: Remove the update en delete mutation in the resolver and the functions in the service.

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // update(id: number, updateBuildingInput: UpdateBuildingInput) {
  //   return `This action updates a #${id} building`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} building`
  // }
}
