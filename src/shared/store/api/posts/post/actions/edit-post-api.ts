import { db } from '@/app/_providers/firebase'
import { error } from '@/shared/data/toastify'
import { IPost } from '@/shared/interfaces/IPost'
import { doc, updateDoc } from 'firebase/firestore'
import { makeAutoObservable } from 'mobx'

class EditPostApi {
  constructor() {
    makeAutoObservable(this)
  }

  loading = false

  submitChanges = async (post: IPost, setIsEditing: (state: boolean) => void) => {
    this.setLoading(true)
    try {
      await updateDoc(doc(db, 'posts', post.id), { ...post })
      setIsEditing(false)
    } catch {
      error('Ошибка редактирования поста')
    } finally {
      this.setLoading(false)
    }
  }

  setLoading = (_: boolean) => (this.loading = _)
}

export default new EditPostApi()
