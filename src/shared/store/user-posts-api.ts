import { makeAutoObservable } from "mobx"
import { IPost } from "../interfaces/IPost"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "@/app/_providers/firebase"


class userPostsApi {
  
    constructor() {
        makeAutoObservable(this)
    }

    // =========== USER-POSTS ==============

    //ALL USER-POSTS STATES
    posts? = [] as IPost[]
    loading = false

    //ALL USER-POSTS ACTIONS
    getUserPosts = async (userId: string) => {
      this.setLoading(true)
        try {
          const q = query(collection(db, 'posts'), where('userName', '==', userId))
          return onSnapshot(q, (querySnapshot) => 
              this.setPosts(querySnapshot.docs.map((doc) => ({
                  ...doc.data(),
                  id: doc.id,
                }) as IPost)
              )
            )
        } catch (e) {
          alert(e)
        } finally {
          this.setLoading(false)
        }
      }

    setLoading = (state: boolean) => this.loading = state
    setPosts = (posts: IPost[]) => this.posts = posts
}

export default new userPostsApi()