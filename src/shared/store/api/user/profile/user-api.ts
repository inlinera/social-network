import { makeAutoObservable } from 'mobx'
//INTERFACES
import { IUser } from '@/shared/interfaces/IUser'
//FIREBASE
import { db } from '@/app/_providers/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { error } from '@/shared/data/toastify'

class userApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =============== USER ===============

  // USER STATES
  userInfo = {} as IUser
  loading = false
  error = ''

  // USER ACTIONS
  getUser = async (id: string) => {
    this.setLoading(true)
    try {
      const res = await getDoc(doc(db, 'users', id))
      this.setUser(res.data() as IUser)
    } catch (e) {
      error('Невозможно получить данные пользователя')
    } finally {
      this.setLoading(false)
    }
  }

  //USER STATE MOVIES
  setUser = (user: IUser) => (this.userInfo = user)
  setLoading = (loading: boolean) => (this.loading = loading)
  setError = (err: string) => (this.error = err)
}

export default new userApi()
