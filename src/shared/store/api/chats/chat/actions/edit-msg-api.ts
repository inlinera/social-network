import { IMessage } from '@/shared/interfaces/IChat'
import { makeAutoObservable } from 'mobx'
import getChatApi from '../get-chat-api'
import { db } from '@/app/_providers/firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

class EditMsgApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== SEND MESSAGE API ===================

  editMessage = async (msg: IMessage, chatId = getChatApi.chat?.chatId) => {
    try {
      await updateDoc(doc(db, 'chats', chatId!), {
        messages: arrayUnion(msg),
      })
    } catch (e) {
      alert(e)
    }
  }
}

export default new EditMsgApi()
