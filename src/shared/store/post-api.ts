import { makeAutoObservable } from 'mobx'
//INTERFACES
import { IPost } from '../interfaces/IPost'
//FIREBASE
import { db } from '@/app/_providers/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

class postApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =============== POST ===============

  //ALL POST STATES
  post? = {} as IPost
  loading = false
  error? = ''

  //ALL POST ACTIONS
  getPost = async (id: string) => {
    this.setLoading(true)
    try {
      const docRef = doc(db, 'posts', id)
      return onSnapshot(docRef, doc => {
        this.setPost({ ...doc.data(), id: doc.id } as IPost)
      })
    } catch (e) {
      this.setError(e as string)
    } finally {
      this.setLoading(false)
    }
  }

  //ALL POST STATES MOVIES
  setPost = (user: IPost) => (this.post = user)
  setLoading = (loading: boolean) => (this.loading = loading)
  setError = (err: string) => (this.error = err)
}

export default new postApi()
