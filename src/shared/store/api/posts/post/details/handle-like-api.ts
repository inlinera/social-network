import { makeAutoObservable } from 'mobx'
//FIREBASE
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/_providers/firebase'
import { error } from '@/shared/data/toastify'

class HandlePostLikeApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== POST LIKES API ===================

  handlePostLike = async (liked: boolean, postId: string, userId: string) => {
    try {
      const postRef = doc(db, 'posts', postId)
      const postDoc = await getDoc(postRef)

      if (postDoc.exists()) {
        const currentLikes = postDoc.data().likes
        if (liked) {
          await updateDoc(postRef, {
            likes: arrayRemove(userId),
          })
        } else if (!currentLikes.includes(userId)) {
          await updateDoc(postRef, {
            likes: arrayUnion(userId),
          })
        }
      }
    } catch (e) {
      error('Произошла ошибка')
    }
  }
}

export default new HandlePostLikeApi()
