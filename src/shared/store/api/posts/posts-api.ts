import { makeAutoObservable, reaction, runInAction } from 'mobx'
//FIREBASE
import { db } from '@/app/_providers/firebase'
import {
  collection,
  limit,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from 'firebase/firestore'
//INTERFACES
import { IPost, TagT } from '@/shared/interfaces/IPost'

import { error, info } from '@/shared/data/toastify'

import authApi from '../user/auth/auth-api'
import { mobxState } from 'mobx-toolbox'

class PostsStore {
  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.tag.tag,
      () => {
        this.reload()
      }
    )
  }

  // ==================================== POSTS ====================================

  // ALL POSTS STATES
  posts = mobxState<IPost[] | null>(null)('posts')
  loading = mobxState(false)('loading')
  tag = mobxState<TagT | null>(null)('tag')
  private _lastDoc = null as QueryDocumentSnapshot | null

  // ALL POSTS ACTIONS
  getPosts = async () => {
    if (this.loading.loading || authApi.loading) return
    this.loading.setLoading(true)
    try {
      const q = query(
        collection(db, 'posts'),
        orderBy('time', 'desc'),
        limit(8),
        where('userName', '!=', `${authApi.user?.displayName}`),
        ...(this.tag.tag ? [where('tags', 'array-contains', this.tag.tag)] : []),
        ...(this._lastDoc ? [startAfter(this._lastDoc)] : [])
      )

      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        return info('Посты закончились')
      }

      const newPosts = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as IPost[]

      runInAction(() => {
        this._lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
        this.posts.setPosts(Array.isArray(this.posts) ? [...this.posts, ...newPosts] : newPosts)
      })
    } catch {
      error('Посты не были получены')
    } finally {
      this.loading.setLoading(false)
    }
  }

  reload = () =>
    runInAction(() => {
      this.posts.setPosts(null)
      this._lastDoc = null
      this.getPosts()
    })
}

export default new PostsStore()
