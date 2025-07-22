import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { FirebaseService } from './services/firebase.service'
import { FirebaseAuthStrategy } from './firebase.auth.strategy'

@Module({
  imports: [PassportModule],
  providers: [FirebaseService, FirebaseAuthStrategy],
})
export class AuthenticationModule {}
