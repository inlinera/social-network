import { db } from '@/app/_providers/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'
import { makeAutoObservable } from 'mobx'
import { IPost } from '../interfaces/IPost'
import authApi from './auth-api.ts'
import { IComment } from '../interfaces/IComment'

class CreatePostApi {
  constructor() {
    makeAutoObservable(this)
  }

  createPost = async (value: string, images?: string[]) => {
    const newPostRef = doc(collection(db, 'posts'))

    return await setDoc(
      newPostRef,
      {
        id: newPostRef.id,
        userName: authApi.user?.displayName,
        userAvatar: authApi.user?.avatarUrl,
        value: value,
        likes: [],
        images: images ? images : [],
        comments: [] as IComment[],
        time: new Date().getTime(),
      } as IPost,
      { merge: true }
    )
  }
}

export default new CreatePostApi()
