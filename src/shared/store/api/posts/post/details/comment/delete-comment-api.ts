import { makeAutoObservable } from 'mobx'
//FIREBASE
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/_providers/firebase'
import { IComment } from '@/shared/interfaces/IComment'
import { error } from '@/shared/data/toastify'

class DeleteCommentApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== POST COMMENTS API ===================

  deleteComment = async (data: IComment, postId: string) => {
    try {
      const postRef = doc(db, 'posts', postId)
      const postDoc = await getDoc(postRef)

      if (postDoc.exists()) {
        await updateDoc(postRef, {
          comments: arrayRemove(data),
        })
      }
    } catch {
      error('Произошла ошибка при удалении комментария')
    }
  }
}

export default new DeleteCommentApi()
