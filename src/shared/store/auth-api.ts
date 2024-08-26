import { makeAutoObservable, runInAction } from "mobx"
// FIREBASE
import { auth, db } from "@/app/_providers/firebase"
import { onAuthStateChanged, setPersistence,  browserLocalPersistence,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
// INTERFACES
import { IUser } from "@/shared/interfaces/IUser"

class AuthorizationStore {

  constructor() {
    makeAutoObservable(this)
    this.initializeAuth()
  }

  // ======================== AUTH ==========================

  //ALL AUTH STATES
  user? = {} as IUser | null
  loading? = true
  error? = '' as string

  //ALL AUTH ACTIONS
   initializeAuth = async () => {
    this.setLoading(true)
    try {
      await setPersistence(auth, browserLocalPersistence)
      onAuthStateChanged(auth, (user) => {
      this.setUser(user as IUser)
      console.log(this.user)
    })
    }
    catch (e) {
      alert(`Error during sign up:, ${e}`)
    }
    finally {
      this.setLoading(false)
    }
  }

  signUp = async (userData: IUser) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password as string
      );

      await setDoc(doc(db, "users", user.uid), {
        ...userData,
        password: ""
      })

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: userData.displayName,
        })
      }

      runInAction(() => {
        this.setUser(user as IUser)
      })
    } catch (e: any) {
      runInAction(() => {
        this.setError(e.message)
      })
      alert(`Error during sign up: ${e.message}`)
    }
  }

  signIn = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      runInAction(() => {
        this.setUser(user as IUser)
      })
    } catch (e: any) {
      runInAction(() => {
        this.setError(e.message)
      })
      alert(`Error during sign in: ${e.message}`)
    }
  }

  // ALL AUTH STATES MOVES
  setLoading = (state: boolean) => this.loading = state
  setUser = (user: IUser | null) => this.user = user
  setError = (err: string) => this.error = err
}

export default new AuthorizationStore()