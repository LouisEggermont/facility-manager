import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { BuildingsService } from './buildings.service'
import { Building } from './entities/building.entity'
import { CreateBuildingInput } from './dto/create-building.input'

@Resolver(() => Building)
export class BuildingsResolver {
  constructor(private readonly buildingsService: BuildingsService) {}

  // @Mutation(() => Building)
  // createBuilding(
  //   @Args('createBuildingInput') createBuildingInput: CreateBuildingInput,
  // ) {
  //   return this.buildingsService.create(createBuildingInput)
  // }

  @Mutation(() => Building, { description: 'Create a building using the DTO.' })
  createBuilding(
    @Args('createBuildingInput') createBuildingInput: CreateBuildingInput,
  ): Promise<Building> {
    return this.buildingsService.create(createBuildingInput)
  }

  // @Query(() => [Building], { name: 'buildings' })
  // findAll() {
  //   return this.buildingsService.findAll();
  // }
  @Query(() => [Building], { name: 'buildings' })
  findAll() {
    console.log('findAll')
    // return [
    //   {
    //     id: '1',
    //     name: 'Campus Kortrijk',
    //     address: 'Graaf Karel de Goedelaan 5, 8500 Kortrijk',
    //     description: 'IT-campus van Howest',
    //     // active: true,
    //     // createdAt: new Date(),
    //     // updatedAt: new Date(),
    //   },
    // ]
    return this.buildingsService.findAll()
  }

  // @Query(() => Building, { name: 'building' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.buildingsService.findOne(id)
  // }

  @Query(() => Building, { name: 'building' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.buildingsService.findOne(id)
  }

  // @Mutation(() => Building)
  // updateBuilding(
  //   @Args('updateBuildingInput') updateBuildingInput: UpdateBuildingInput,
  // ) {
  //   return this.buildingsService.update(
  //     updateBuildingInput.id,
  //     updateBuildingInput,
  //   )
  // }

  // @Mutation(() => Building)
  // removeBuilding(@Args('id', { type: () => Int }) id: number) {
  //   return this.buildingsService.remove(id)
  // }
}
