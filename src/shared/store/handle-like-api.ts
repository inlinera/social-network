import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { makeAutoObservable } from "mobx"
import { db } from "@/app/_providers/firebase"


class handlePostLikeApi {
    constructor() {
        makeAutoObservable(this)
    }

    // ========= LIKES ==========

    //ALL LIKES ACTIONS
    handlePostLike = async (liked: boolean, postId: string, userId: string) => {
        try {
          const postRef = doc(db, 'posts', postId)
      
          const postDoc = await getDoc(postRef)
          const currentLikes = postDoc.data()?.likes || []
          const cleanedLikes = currentLikes.filter((like: string) => like != '')
      
          if (liked) {
            await updateDoc(postRef, {
              likes: arrayRemove(userId)
            })
          } else {
            if (!cleanedLikes.includes(userId)) { 
              await updateDoc(postRef, {
                likes: arrayUnion(userId)
              })
            }
          }
        } catch (e) {
          alert(e)
        }
      }
}

export default new handlePostLikeApi()