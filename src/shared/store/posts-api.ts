import { makeAutoObservable, runInAction } from "mobx"
//FIREBASE
import { db } from "@/app/_providers/firebase"
import { arrayRemove, arrayUnion, collection, doc, 
  getDoc, onSnapshot, query, updateDoc, where } from "firebase/firestore"
//INTERFACES
import { IPost } from "../interfaces/IPost"

class PostsStore {

  constructor() {
    makeAutoObservable(this)
  }

  // ================== POSTS ===================

  //ALL POSTS STATES
  posts? = [] as IPost[]
  userPosts? = [] as IPost[]
  loading? = false

  //ALL POSTS ACTIONS
  getPosts = async () => {
    try {
      this.setLoading(true)
      const q = query(collection(db, "posts"))
      return onSnapshot(q, (querySnapshot) => {
        runInAction(() => {
          this.posts = querySnapshot.docs.map((doc) => ({
            ...doc.data()!,
            id: doc.id,
          }) as IPost)
        })
      })
    } catch (e) {
      alert(e)
    }
    finally {
      this.setLoading(false)
    }
  }

  getUserPosts = async (userId: string) => {
    try {
      this.setLoading(true)

      const q = query(collection(db, "posts"), where("userId", "==", userId))

      return onSnapshot(q, (querySnapshot) => {
        runInAction(() => {
          this.userPosts = querySnapshot.docs.map((doc) => ({
            ...doc.data()!,
            id: doc.id,
          }) as IPost)
        })
      })
    } catch (e) {
      alert(e)
    } 
    finally {
      this.setLoading(false)
    }
  }

  handlePostLike = async (liked: boolean, postId: string, userId: string) => {
    try {
      const postRef = doc(db, 'posts', postId)
  
      const postDoc = await getDoc(postRef)
      const currentLikes = postDoc.data()?.likes || []
      const cleanedLikes = currentLikes.filter((like: string) => like !== '')
  
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

  //ALL POSTS STATES MOVIES
  setLoading = (state: boolean) => this.loading = state
}

export default new PostsStore()