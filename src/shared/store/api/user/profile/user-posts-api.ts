import { makeAutoObservable } from 'mobx'
import { IPost } from '@/shared/interfaces/IPost'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/app/_providers/firebase'

class userPostsApi {
  constructor() {
    makeAutoObservable(this)
  }

  // ====================== USER-POSTS ======================

  // USER_POSTS STATES
  posts? = [] as IPost[]
  loading = false

  // USER_POSTS ACTIONS
  getUserPosts = async (userId: string) => {
    this.setLoading(true)
    try {
      const q = query(
        collection(db, 'posts'),
        where('userName', '==', userId),
        orderBy('time', 'desc')
      )
      return onSnapshot(q, querySnapshot =>
        this.setPosts(
          querySnapshot.docs.map(
            doc =>
              ({
                ...doc.data(),
                id: doc.id,
              } as IPost)
          )
        )
      )
    } catch (e) {
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }
  // USER_POSTS STATE MOVES
  setLoading = (state: boolean) => (this.loading = state)
  setPosts = (posts: IPost[]) => (this.posts = posts)
}

export default new userPostsApi()
