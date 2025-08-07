import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BuildingsModule } from './buildings/buildings.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeedModule } from './seed/seed.module'
import { IssuesModule } from './issues/issues.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { RoomsModule } from './rooms/rooms.module'
import { InspectionRoundsModule } from './inspection-rounds/inspection-rounds.module'
import { RoundRoomProgressModule } from './round-room-progress/round-room-progress.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ConfigModule.forRoot(),
    BuildingsModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27027/api',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true, // Careful with this in production
      // useNewUrlParser: true,
      // useUnifiedTopology: true, // Disable deprecated warnings
    }),
    SeedModule,
    IssuesModule,
    AuthenticationModule,
    UsersModule,
    RoomsModule,
    InspectionRoundsModule,
    RoundRoomProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
