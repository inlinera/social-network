import { makeAutoObservable, runInAction } from "mobx"
//INTERFACES
import { IUser } from "../interfaces/IUser"
//FIREBASE
import { db } from "@/app/_providers/firebase"
import { doc, getDoc } from "firebase/firestore"


class userPageStore {
  userInfo? = {} as IUser
  loading? = true
  error? = ''

  constructor() {
    makeAutoObservable(this)
  }

  getUser = async (id: string) => {
    this.setLoading(true)
    try {
      const res = await getDoc(doc(db, "users", id))
      runInAction(() => {
        this.setUser(res.data() as IUser)
      })
    } catch (e: any) {
      this.setError(e)
      throw new Error(`An error was occured when get user: ${e}`)
    } finally {
      runInAction(() => {
        this.setLoading(false)
      })
    }
  }

  //ALL USER STATES MOVIES
  setUser = (user: IUser) => this.userInfo = user
  setLoading = (loading: boolean) =>  this.loading = loading
  setError = (err: string) => this.error = err
}

export default new userPageStore()