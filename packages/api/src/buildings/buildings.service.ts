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
    const objID = new ObjectId(id)
    return this.buildingRepository.findOneByOrFail({ id: objID })
  }

  // TODO: Remove the update en delete mutation in the resolver and the functions in the service.

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // update(id: number, updateBuildingInput: UpdateBuildingInput) {
  //   return `This action updates a #${id} building`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} building`
  // }
}
