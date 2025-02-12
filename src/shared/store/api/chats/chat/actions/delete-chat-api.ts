import { db } from '@/app/_providers/firebase'
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { makeAutoObservable } from 'mobx'
import getChatApi from '../get-chat-api'
import authApi from '../../../user/auth/auth-api'

class DeleteChatApi {
  constructor() {
    makeAutoObservable(this)
  }

  deleteChat = async (
    chatId: string,
    userId: string,
    myId = `${authApi.user?.displayName}`
  ) => {
    try {
      await Promise.all([
        deleteDoc(doc(db, 'chats', chatId)),
        updateDoc(doc(db, 'users', myId), {
          chats: arrayRemove(chatId),
        }),
        updateDoc(doc(db, 'users', userId), {
          chats: arrayRemove(chatId),
        }),
      ])
      getChatApi.setChat(null)
    } catch (e) {
      console.error(e)
    }
  }
}

export default new DeleteChatApi()
