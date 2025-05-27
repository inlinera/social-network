import { db } from '@/app/_providers/firebase'
import { error } from '@/shared/data/toastify'
import { IPost } from '@/shared/interfaces/IPost'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { makeAutoObservable } from 'mobx'
import storageApi from '../../../storage/storage-api'

class DeletePostApi {
  constructor() {
    makeAutoObservable(this)
  }

  // DELETE POST API STATES
  loading = false

  // DELETE POST ACTION
  deletePost = async (id: string) => {
    this.setLoading(true)
    try {
      const post = await getDoc(doc(db, 'posts', id))
      const data = post.data() as IPost
      if (Array.isArray(data.images) && data.images.length > 0) {
        const imgPromises = data.images.map(img => storageApi.deleteImage(img))
        await Promise.all(imgPromises)
      }

      await deleteDoc(doc(db, 'posts', id))
    } catch {
      error('Невозможно удалить пост')
    } finally {
      this.setLoading(false)
    }
  }

  // DELETE POST STATE MOVES
  setLoading = (state: boolean) => (this.loading = state)
}

export default new DeletePostApi()
