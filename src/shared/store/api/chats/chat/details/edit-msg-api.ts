import { IMessage } from '@/shared/interfaces/IChat'
import { makeAutoObservable } from 'mobx'
import getChatApi from '../get-chat-api'
import { db } from '@/app/_providers/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import inputState from '@/shared/store/functional/chat/input/input-state'

class EditMsgApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== SEND MESSAGE API ===================

  loading = false

  editMessage = async (msg: IMessage, chatId = getChatApi.chat?.chatId) => {
    this.setLoading(true)
    try {
      const chatRef = doc(db, 'chats', chatId!)
      const docSnap = await getDoc(chatRef)
      if (!docSnap.exists()) return

      const chatData = docSnap.data()
      const messages = chatData.messages.map((m: IMessage) => {
        if (m.id === msg.id) return msg
        return m
      })

      await updateDoc(chatRef, {
        messages: messages,
      })
      inputState.setActionMsg(null)
    } catch (e) {
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }

  setLoading = (_: boolean) => (this.loading = _)
}

export default new EditMsgApi()
