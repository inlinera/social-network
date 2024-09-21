import { makeAutoObservable } from "mobx"
//FIREBASE
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/app/_providers/firebase"

class HandlePostLikeApi {

  constructor() {
    makeAutoObservable(this)
  }

  // =================== POST LIKES API =====================

  handlePostLike = async (liked: boolean, postId: string, userId: string) => {
    try {
      const postRef = doc(db, 'posts', postId)
      const postDoc = await getDoc(postRef)
      const currentLikes = postDoc.data()?.likes
      
      if (liked) {
        await updateDoc(postRef, {
           likes: arrayRemove(userId) 
          })
      } else if (!currentLikes.includes(userId)) {
        await updateDoc(postRef, {
           likes: arrayUnion(userId) 
          })
      }
    } catch (e) {
      alert(e)
    }
  }
}

export default new HandlePostLikeApi()