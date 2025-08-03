import { Injectable } from '@nestjs/common'
import * as rooms from './data/rooms.json'
import { Room, RoomType } from 'src/rooms/entities/room.entity'
import { RoomsService } from 'src/rooms/rooms.service'
import { SeverityType } from 'src/rooms/entities/checkListItem.entity'

@Injectable()
export class RoomsSeeder {
  constructor(private readonly roomsService: RoomsService) {}

  async seed(): Promise<Room[]> {
    const allRooms: Room[] = []

    for (const r of rooms) {
      const room = new Room()
      room.code = r.code
      room.alias = r.alias
      room.buildingId = r.buildingId
      room.type = RoomType[r.type as keyof typeof RoomType]
      room.floor = r.floor
      room.checklistItems = r.checklistItems.map(item => ({
        label: item.label,
        severity: SeverityType[item.severity as keyof typeof SeverityType],
      }))
      room.createdAt = new Date()

      allRooms.push(room)
    }

    return this.roomsService.saveAll(allRooms)
  }

  async deleteAll(): Promise<void> {
    return this.roomsService.truncate()
  }
}
