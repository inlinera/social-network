import { db } from '@/app/_providers/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'
import { makeAutoObservable } from 'mobx'
import { IPost } from '@/shared/interfaces/IPost'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { IComment } from '@/shared/interfaces/IComment'

class CreatePostApi {
  constructor() {
    makeAutoObservable(this)
  }

  createPost = async (value: string, tags: string[], images?: string[]) => {
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
        tags: tags,
      } as IPost,
      { merge: true }
    )
  }
}

export default new CreatePostApi()
