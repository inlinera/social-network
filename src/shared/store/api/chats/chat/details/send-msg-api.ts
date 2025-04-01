import { makeAutoObservable } from 'mobx'
//FIREBASE
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/_providers/firebase'
//INTERFACES
import { IMessage } from '@/shared/interfaces/IChat'
import chatState from '@/shared/store/api/chats/chat/get-chat-api'
import { error } from '@/shared/data/toastify'

class SendMsgApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== SEND MESSAGE API ===================

  sendMessage = async (data: Omit<IMessage, 'time'>, chatId = chatState.chat?.chatId) => {
    if (!chatId) return alert('Error, cannot find chatId')

    try {
      const chatRef = doc(db, 'chats', chatId)
      const chatDoc = await getDoc(chatRef)

      const currTime = Date.now()

      if (chatDoc.exists()) {
        await updateDoc(chatRef, {
          messages: arrayUnion({ time: currTime, ...data }),
          time: currTime,
        })
      }
    } catch {
      error('Вы не можете отправить сообщение')
    }
  }
}

export default new SendMsgApi()
