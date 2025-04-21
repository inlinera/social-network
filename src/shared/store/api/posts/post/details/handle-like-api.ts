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

  handlePostLike = async (postId: string, userId: string) => {
    try {
      const postRef = doc(db, 'posts', postId)
      const postDoc = await getDoc(postRef)

      if (postDoc.exists()) {
        const currentLikes = postDoc.data().likes

        if (!currentLikes.includes(userId)) {
          return await updateDoc(postRef, {
            likes: arrayUnion(userId),
          })
        }
        await updateDoc(postRef, {
          likes: arrayRemove(userId),
        })
      }
    } catch (e) {
      error('Произошла ошибка')
    }
  }
}

export default new HandlePostLikeApi()
