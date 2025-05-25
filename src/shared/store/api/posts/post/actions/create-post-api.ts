import { db } from '@/app/_providers/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'
import { makeAutoObservable } from 'mobx'
import { IPost } from '@/shared/interfaces/IPost'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { IComment } from '@/shared/interfaces/IComment'

import { error } from '@/shared/data/toastify'
import userPostsApi from '../../../user/profile/user-posts-api'

class CreatePostApi {
  constructor() {
    makeAutoObservable(this)
  }

  createPost = async (value: string, tags: string[], images?: string[]) => {
    if (userPostsApi.posts.posts.length >= 10) return error('Максимальное кол-во постов: 10')
    try {
      const newPostRef = doc(collection(db, 'posts'))

      const postData = {
        uid: authApi.user?.uid,
        id: newPostRef.id,
        userName: authApi.user?.displayName,
        userAvatar: authApi.user?.avatarUrl ?? null,
        value,
        likes: [],
        images: images ?? [],
        comments: [] as IComment[],
        time: new Date().getTime(),
        tags,
      } as IPost

      await setDoc(newPostRef, postData, { merge: true })
    } catch (e) {
      error(`Невозможно создать пост`)
    }
  }
}

export default new CreatePostApi()
