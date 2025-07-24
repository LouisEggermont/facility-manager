import { Injectable } from '@nestjs/common'
import {
  App,
  applicationDefault,
  cert,
  initializeApp,
} from 'firebase-admin/app'
import { Auth, getAuth } from 'firebase-admin/auth'

@Injectable()
export class FirebaseService {
  private firebaseApp: App

  constructor() {
    console.log('🧪 Starting FirebaseService...')

    const serviceAccount = require('../../../secrets/firebase-project-settings.json')

    this.firebaseApp = initializeApp({
      // import hard coded service account key
      credential: cert(serviceAccount),
      // credential: applicationDefault(), // this should be the normal way of Environment variable GOOGLE_APPLICATION_CREDENTIALS, see issue #30
    })

    const credential = this.firebaseApp.options.credential
    // @ts-expect-error: projectId is not typed in firebase-admin but exists on the credential object
    if (!credential.projectId) {
      throw new Error('\n\n⛔️ Firebase app not initialized.\n')
    }
  }

  getAuth = (): Auth => getAuth()
}
