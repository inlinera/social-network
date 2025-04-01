import { IMessage } from '@/shared/interfaces/IChat'
import { makeAutoObservable } from 'mobx'
import getChatApi from '../get-chat-api'
import { db } from '@/app/_providers/firebase'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { error } from '@/shared/data/toastify'

class PinMsgApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== PIN MESSAGE API ===================

  loading = false

  pinMessage = async (msg: IMessage, chatId = getChatApi.chat?.chatId) => {
    this.setLoading(true)
    try {
      const chatRef = doc(db, 'chats', chatId!)
      const docSnap = await getDoc(chatRef)
      if (!docSnap.exists()) return

      await updateDoc(chatRef, {
        pinned: arrayUnion(msg),
      })
    } catch (e) {
      error('Невозможно закрепить сообщение')
    } finally {
      this.setLoading(false)
    }
  }

  setLoading = (_: boolean) => (this.loading = _)
}

export default new PinMsgApi()
