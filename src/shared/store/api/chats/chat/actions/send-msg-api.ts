import { makeAutoObservable } from 'mobx'
//FIREBASE
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/_providers/firebase'
//INTERFACES
import { IMessage } from '@/shared/interfaces/IChat'
import chatState from '@/shared/store/api/chats/chat/get-chat-api'

class SendMsgApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== SEND MESSAGE API ===================

  sendMessage = async (data: IMessage, chatId = chatState.chat?.chatId) => {
    if (!chatId) return alert('Error, cannot find chatId')
    try {
      const chatRef = doc(db, 'chats', chatId)
      const chatDoc = await getDoc(chatRef)

      if (chatDoc.exists()) {
        await updateDoc(chatRef, {
          messages: arrayUnion(data),
        })
      }
    } catch (e) {
      alert(e)
    }
  }
}

export default new SendMsgApi()
