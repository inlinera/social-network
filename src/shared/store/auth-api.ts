import { makeAutoObservable, runInAction } from 'mobx'
// FIREBASE
import { auth, db } from '@/app/_providers/firebase'
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
// INTERFACES
import { IUser } from '@/shared/interfaces/IUser'
import storageApi from './storage-api'
// DATA
import { defaultAvatar } from '@/shared/data/default-avatar'

class AuthorizationStore {
  
  constructor() {
    makeAutoObservable(this)
    this.initializeAuth()
  }

  // ======================== AUTH ========================

  //ALL AUTH STATES
  user? = null as IUser | null
  loading? = true
  error? = ''

  //ALL AUTH ACTIONS
  initializeAuth = async () => {
    this.setLoading(true)
    try {
      await setPersistence(auth, browserLocalPersistence)
      onAuthStateChanged(auth, async user => {
        const { displayName } = user as IUser
        const updatedUserDoc = await getDoc(doc(db, 'users', displayName!))
        if (updatedUserDoc.exists()) {
          const updatedUserData = updatedUserDoc.data() as IUser
          this.setUser({ ...updatedUserData, displayName })
        }
      })
    } catch (e) {
      alert(`Error during initialization: ${e}`)
    } finally {
      this.setLoading(false)
    }
  }

  signUp = async (userData: IUser) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password!
      )

      await setDoc(doc(db, 'users', userData.displayName), {
        ...userData,
        password: '',
        avatarUrl: storageApi.image ? storageApi.image : defaultAvatar,
      })

      await updateProfile(auth.currentUser!, {
        displayName: userData.displayName,
      })

      runInAction(() => {
        this.setUser(user as IUser)
        this.setToken(user.displayName!)
      })
    } catch (e: any) {
      this.setError(e.message)
      alert(`Error during sign up: ${e.message}`)
    }
  }

  signIn = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      runInAction(() => {
        this.setUser(user as IUser)
        this.setToken(user.displayName!)
      })
    } catch (e: any) {
      this.setError(e.message)
      alert(`Error during sign in: ${e.message}`)
    }
  }

  // ALL AUTH STATES MOVES
  setLoading = (state: boolean) => (this.loading = state)
  setUser = (user: IUser | null) => (this.user = user)
  setError = (err: string) => (this.error = err)
  setToken = (token: string) => localStorage.setItem('token-wunderkids', token)
}

export default new AuthorizationStore()