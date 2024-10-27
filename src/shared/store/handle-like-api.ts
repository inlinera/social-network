import { makeAutoObservable } from 'mobx'
//FIREBASE
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/_providers/firebase'

class HandlePostLikeApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== POST LIKES API ===================

  handlePostLike = async (liked: boolean, postId: string, userId: string) => {
    try {
      console.log('postId:', postId) // Check postId
      const postRef = doc(db, 'posts', postId)
      console.log('postRef:', postRef) // Check postRef

      const postDoc = await getDoc(postRef)
      console.log('postDoc:', postDoc) // Check postDoc

      if (postDoc.exists()) {
        console.log('postDoc.data():', postDoc.data()) // Check postDoc.data()

        const currentLikes = postDoc.data().likes
        console.log('currentLikes:', currentLikes) // Check currentLikes

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
      alert(e)
    }
  }
}

export default new HandlePostLikeApi()
