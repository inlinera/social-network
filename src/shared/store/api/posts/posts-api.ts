import { makeAutoObservable, reaction, runInAction } from 'mobx'
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
  where,
} from 'firebase/firestore'
//INTERFACES
import { EnumTags, IPost } from '@/shared/interfaces/IPost'

import { error, info } from '@/shared/data/toastify'

import authApi from '../user/auth/auth-api'
import { mobxState } from 'mobx-toolbox'

class PostsStore {
  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.tag.tag,
      () => {
        this.setPosts(null)
        this._lastDoc = null
        this.getPosts()
      }
    )
  }

  // ==================================== POSTS ====================================

  //ALL POSTS STATES
  posts = null as IPost[] | null
  loading = false
  tag = mobxState<EnumTags | null>(null)('tag')
  private _lastDoc = null as QueryDocumentSnapshot | null

  //ALL POSTS ACTIONS
  getPosts = async () => {
    if (this.loading) return
    this.setLoading(true)
    try {
      const q = query(
        collection(db, 'posts'),
        orderBy('time', 'desc'),
        where('userName', '!=', `${authApi.user?.displayName}`),
        limit(8),
        ...(this.tag.tag ? [where('tags', 'array-contains', this.tag.tag)] : []),
        ...(this._lastDoc ? [startAfter(this._lastDoc)] : [])
      )

      return onSnapshot(q, querySnapshot => {
        if (querySnapshot.empty) {
          return info('Посты закончились')
        }

        const newPosts = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        })) as IPost[]

        const existingPostIds = new Set(this.posts?.map(post => post.id))
        const uniquePosts = newPosts.filter(newPost => !existingPostIds.has(newPost.id))
        runInAction(() => {
          this._lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
          this.setPosts(Array.isArray(this.posts) ? [...this.posts, ...uniquePosts] : uniquePosts)
        })
      })
    } catch {
      error('Посты не были получены')
    } finally {
      this.setLoading(false)
    }
  }

  //ALL POSTS STATES MOVIES
  setLoading = (state: boolean) => (this.loading = state)
  setPosts = (posts: IPost[] | null) => (this.posts = posts)
}

export default new PostsStore()
