import { db } from '@/app/_providers/firebase'
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { makeAutoObservable } from 'mobx'
import getChatApi from '../get-chat-api'
import authApi from '../../../user/auth/auth-api'
import { error } from '@/shared/data/toastify'

class DeleteChatApi {
  constructor() {
    makeAutoObservable(this)
  }

  deleteChat = async (chatId: string, userId: string, myId = `${authApi.user?.displayName}`) => {
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
    } catch {
      error('Ошибка удаления чата')
    }
  }
}

export default new DeleteChatApi()
