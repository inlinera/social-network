import { makeAutoObservable } from 'mobx'
import { db } from '@/app/_providers/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import inputState from '@/shared/store/functional/chat/input/input-state'
import { error } from '@/shared/data/toastify'
import { IComment } from '@/shared/interfaces/IComment'

class EditCommApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== EDIT COMMENT API ===================

  loading = false

  editComment = async (comment: IComment, postId: string) => {
    this.setLoading(true)
    try {
      const postRef = doc(db, 'posts', postId)

      const docSnap = await getDoc(postRef)
      if (!docSnap.exists()) return

      const postData = docSnap.data()
      const comments = postData.comments.map((c: IComment) => {
        if (c.id === comment.id) return comment
        return c
      })

      await updateDoc(postRef, {
        comments: comments,
      })
      inputState.setActionMsg(null)
    } catch (e) {
      error('Ошибка редактирования комментария')
    } finally {
      this.setLoading(false)
    }
  }

  setLoading = (_: boolean) => (this.loading = _)
}

export default new EditCommApi()
