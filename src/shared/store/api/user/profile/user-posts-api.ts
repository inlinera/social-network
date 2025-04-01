import { makeAutoObservable } from 'mobx'
import { IPost } from '@/shared/interfaces/IPost'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/app/_providers/firebase'
import { mobxState } from 'mobx-toolbox'
import { error } from '@/shared/data/toastify'

class userPostsApi {
  constructor() {
    makeAutoObservable(this)
  }

  // ====================== USER-POSTS ======================

  // USER_POSTS STATES
  posts = mobxState<IPost[]>([])('posts')
  loading = mobxState(false)('loading')

  // USER_POSTS ACTIONS
  getUserPosts = async (userId: string) => {
    this.loading.setLoading(true)
    try {
      const q = query(collection(db, 'posts'), where('userName', '==', userId), orderBy('time', 'desc'))
      return onSnapshot(q, querySnapshot =>
        this.posts.setPosts(
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
      error('Упс, произошла ошибка при получении постов')
    } finally {
      this.loading.setLoading(false)
    }
  }
}

export default new userPostsApi()
