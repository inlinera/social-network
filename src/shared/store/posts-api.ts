import { makeAutoObservable, runInAction } from "mobx"
//FIREBASE
import { db } from "@/app/_providers/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
//INTERFACES
import { IPost } from "../interfaces/IPost"

class PostsStore {

  constructor() {
    makeAutoObservable(this)
  }

  // ================== POSTS ===================

  //ALL POSTS STATES
  posts?: IPost[] = []
  loading? = false


  //ALL POSTS ACTIONS
  getPosts = async () => {
    try {
      this.setLoading(true)
      const querySnapshot = await getDocs(collection(db, "posts"))
      runInAction(() => {
        this.posts = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        } as IPost))
      })
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
    finally {
      this.setLoading(false)
    }
  }

  getUserPosts = async (userId: string) => {
    try {
      this.setLoading(true)
      const q = query(collection(db, "posts"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      runInAction(() => {
        this.posts = querySnapshot.docs.map((doc) => ({
          ...doc.data()!,
          id: doc.id,
        } as IPost))
      })
    } catch (error) {
      console.error("Error fetching user posts:", error)
    } finally {
      this.setLoading(false)
    }
  }

  //ALL POSTS STATES MOVIES
  setLoading = (state: boolean) => this.loading = state
}

export default new PostsStore()