import { makeAutoObservable } from 'mobx'
//FIREBASE
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/_providers/firebase'
import { IComment } from '@/shared/interfaces/IComment'
import { error } from '@/shared/data/toastify'

class AddCommentApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== POST COMMENTS API ===================

  addComment = async (data: IComment, postId: string) => {
    try {
      const postRef = doc(db, 'posts', postId)
      const postDoc = await getDoc(postRef)

      if (postDoc.exists()) {
        await updateDoc(postRef, {
          comments: arrayUnion(data),
        })
      }
    } catch {
      error('Невозможно написать комментарий')
    }
  }
}

export default new AddCommentApi()
