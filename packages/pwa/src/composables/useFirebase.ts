import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
} from 'firebase/auth'
import { ref } from 'vue'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const firebaseUser = ref<User | null>(auth.currentUser)

const login = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        firebaseUser.value = userCredential.user
        resolve(userCredential.user)
      })
      .catch(error => reject(error))
  })
}

const register = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        firebaseUser.value = userCredential.user
        updateProfile(userCredential.user, { displayName: name })
        resolve(userCredential.user)
      })
      .catch(error => reject(error))
  })
}

const resetPassword = async (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email)
}

const restoreUser = async (): Promise<User | null> => {
  return new Promise(resolve => {
    onAuthStateChanged(auth, user => {
      firebaseUser.value = user
      resolve(user)
    })
  })
}

const logout = async (): Promise<void> => {
  return signOut(auth).then(() => {
    firebaseUser.value = null
  })
}

export default () => ({
  firebaseUser,
  login,
  register,
  resetPassword,
  restoreUser,
  logout,
})
