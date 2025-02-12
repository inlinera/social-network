import { makeAutoObservable } from 'mobx'
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
  lastDoc = null as QueryDocumentSnapshot | null

  //ALL POSTS ACTIONS
  getPosts = async (fetchMore?: boolean) => {
    if (this.loading) return
    this.setLoading(true)
    try {
      if (!fetchMore) {
        fetchMore = false
      }
      const q = query(
        collection(db, 'posts'),
        orderBy('time', 'desc'),
        ...(fetchMore && this.lastDoc ? [startAfter(this.lastDoc)] : []),
        limit(8)
      )

      return onSnapshot(q, querySnapshot => {
        if (querySnapshot.empty) return alert('ты ебанутый? а ничо то что посты закончились')
        const newPosts = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        })) as IPost[]

        this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

        const uniquePosts = newPosts.filter(
          newPost => !this.posts?.some(post => post.id === newPost.id)
        )

        this.setPosts(fetchMore ? [...this.posts!, ...uniquePosts] : newPosts)
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
