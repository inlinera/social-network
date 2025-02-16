import { makeAutoObservable, runInAction } from 'mobx'
//FIREBASE
import { db } from '@/app/_providers/firebase'
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore'
//INTERFACES
import { IPost } from '@/shared/interfaces/IPost'

class PostsStore {
  constructor() {
    makeAutoObservable(this)
  }

  // ================== POSTS ==================

  //ALL POSTS STATES
  posts = null as IPost[] | null
  loading = false
  private _lastDoc = null as QueryDocumentSnapshot | null

  //ALL POSTS ACTIONS
  getPosts = async () => {
    this.setLoading(true)
    try {
      const q = query(
        collection(db, 'posts'),
        orderBy('time', 'desc'),
        limit(8),
        ...(this._lastDoc ? [startAfter(this._lastDoc)] : [])
      )

      return onSnapshot(q, querySnapshot => {
        if (querySnapshot.empty) return alert('ты ебанутый? а ничо то что посты закончились')
        const newPosts = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        })) as IPost[]

        const existingPostIds = new Set(this.posts?.map(post => post.id))
        const uniquePosts = newPosts.filter(newPost => !existingPostIds.has(newPost.id))
        runInAction(() => {
          this._lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
          this.setPosts(
            Array.isArray(this.posts) ? [...this.posts, ...uniquePosts] : uniquePosts
          )
        })
      })
    } catch (e) {
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }

  //ALL POSTS STATES MOVIES
  setLoading = (state: boolean) => (this.loading = state)
  setPosts = (posts: IPost[] | null) => (this.posts = posts)
}

export default new PostsStore()
