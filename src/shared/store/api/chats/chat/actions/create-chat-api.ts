import { db } from '@/app/_providers/firebase'
import { arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { makeAutoObservable } from 'mobx'
import authApi from '../../../user/auth/auth-api'
import { IFriend } from '@/shared/interfaces/IFriend'
import { error } from '@/shared/data/toastify'

class CreateChatApi {
  constructor() {
    makeAutoObservable(this)
  }

  createChat = async (userId: string, myId = `${authApi.user?.displayName}`) => {
    try {
      const newPostRef = doc(collection(db, 'chats'))
      const people: IFriend[] = [{ displayName: myId }, { displayName: userId }]
      await Promise.all([
        setDoc(newPostRef, {
          messages: [],
          people,
          pinned: [],
        }),
        updateDoc(doc(db, 'users', myId), {
          chats: arrayUnion(newPostRef.id),
        }),
        updateDoc(doc(db, 'users', userId), {
          chats: arrayUnion(newPostRef.id),
        }),
      ])
      return newPostRef.id
    } catch {
      error('Ошибка создания чата')
    }
  }
}

export default new CreateChatApi()
