import { makeAutoObservable } from 'mobx'
// INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
import { IChat, IMessage } from '@/shared/interfaces/IChat'
//FIREBASE
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/app/_providers/firebase'

export interface IChatState {
  people?: IFriend
  messages?: IMessage[]
  chatId?: string
  setChat: (_: IChatState | null) => void
}

class GetChatApi {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== CHAT STATE ===================
  chat: IChat | null = null
  loading = false

  // GET CHATS ACTIONS
  getChat = (chatId: string) => {
    this.setLoading(true)
    try {
      return onSnapshot(doc(db, 'chats', chatId), doc => {
        if (doc.exists()) {
          return this.setChat({ ...doc.data(), chatId: doc.id } as IChat)
        }
      })
    } catch (e) {
      console.error('Error fetching chats: ', e)
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }

  // GET CHATS STATE MOVES
  setLoading = (state: boolean) => (this.loading = state)
  setChat = (chat: IChat | null) => (this.chat = chat)
}

export default new GetChatApi()
