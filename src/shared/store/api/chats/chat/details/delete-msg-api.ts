import { IMessage } from '@/shared/interfaces/IChat'
import { makeAutoObservable } from 'mobx'
import getChatApi from '../get-chat-api'
import { db } from '@/app/_providers/firebase'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { error } from '@/shared/data/toastify'

class DeleteMsgApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== SEND MESSAGE API ===================

  deleteMessage = async (msg: IMessage, chatId = getChatApi.chat?.chatId) => {
    try {
      await updateDoc(doc(db, 'chats', chatId!), {
        messages: arrayRemove(msg),
      })
    } catch (e) {
      error('Невозможно удалить сообщение')
    }
  }
}

export default new DeleteMsgApi()
