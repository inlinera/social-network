import { db } from '@/app/_providers/firebase'
import { IPost } from '@/shared/interfaces/IPost'
import { doc, updateDoc } from 'firebase/firestore'
import { makeAutoObservable } from 'mobx'

class EditPostApi {
  constructor() {
    makeAutoObservable(this)
  }

  submitChanges = async (post: IPost, setIsEditing: (state: boolean) => void) => {
    try {
      await updateDoc(doc(db, 'posts', post.id), { ...post })
      setIsEditing(false)
    } catch (e) {
      alert(e)
    }
  }
}

export default new EditPostApi()
