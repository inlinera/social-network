import { IMessage } from '@/shared/interfaces/IChat'
import { makeAutoObservable } from 'mobx'
import getChatApi from '../get-chat-api'
import { db } from '@/app/_providers/firebase'
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore'

class UnpinMsgApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== PIN MESSAGE API ===================

  loading = false

  unpinMessage = async (msg: IMessage, chatId = getChatApi.chat?.chatId) => {
    this.setLoading(true)
    try {
      const chatRef = doc(db, 'chats', chatId!)
      const docSnap = await getDoc(chatRef)
      if (!docSnap.exists()) return

      await updateDoc(chatRef, {
        pinned: arrayRemove(msg),
      })
    } catch (e) {
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }

  setLoading = (_: boolean) => (this.loading = _)
}

export default new UnpinMsgApi()
