import { makeAutoObservable } from 'mobx'
//INTERFACES
import { IPost } from '@/shared/interfaces/IPost'
//FIREBASE
import { db } from '@/app/_providers/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { error } from '@/shared/data/toastify'
import { mobxState } from 'mobx-toolbox'

class postApi {
  constructor() {
    makeAutoObservable(this)
  }

  // ===================== POST =====================

  // POST STATES
  post = mobxState<IPost | null>(null)('post')
  loading = mobxState(false)('loading')

  // POST ACTIONS
  getPost = async (id: string) => {
    this.loading.setLoading(true)
    try {
      const docRef = doc(db, 'posts', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) return this.post.setPost({ ...docSnap.data(), id: docSnap.id } as IPost)
    } catch {
      error('Невозможно получить пост')
    } finally {
      this.loading.setLoading(false)
    }
  }
}

export default new postApi()
