import { Module } from '@nestjs/common'
import { InspectionRoundsService } from './inspection-rounds.service'
import { InspectionRoundsResolver } from './inspection-rounds.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InspectionRound } from './entities/inspection-round.entity'
import { RoomsModule } from 'src/rooms/rooms.module'

@Module({
  imports: [TypeOrmModule.forFeature([InspectionRound]), RoomsModule],
  providers: [InspectionRoundsResolver, InspectionRoundsService],
  exports: [InspectionRoundsService],
})
export class InspectionRoundsModule {}
