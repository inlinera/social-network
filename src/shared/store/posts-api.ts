import { makeAutoObservable } from "mobx"
//FIREBASE
import { db } from "@/app/_providers/firebase"
import { collection, onSnapshot, query } from "firebase/firestore"
//INTERFACES
import { IPost } from "../interfaces/IPost"

class PostsStore {

  constructor() {
    makeAutoObservable(this)
  }

  // ================== POSTS ===================

  //ALL POSTS STATES
  posts? = [] as IPost[]
  loading? = false

  //ALL POSTS ACTIONS
  getPosts = async () => {
    this.setLoading(true)
    try {
      return onSnapshot(query(collection(db, 'posts')), (querySnapshot) => {
          this.setPosts(querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }) as IPost))
        })
    } catch (e) {
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }

  //ALL POSTS STATES MOVIES
  setLoading = (state: boolean) => this.loading = state
  setPosts = (posts: IPost[]) => this.posts = posts
}

export default new PostsStore()