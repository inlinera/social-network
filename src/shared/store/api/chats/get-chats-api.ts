import { makeAutoObservable } from 'mobx'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/app/_providers/firebase'
//INTERFACES
import { IChat } from '@/shared/interfaces/IChat'
import { IFriend } from '@/shared/interfaces/IFriend'

class getChatsApi {
  constructor() {
    makeAutoObservable(this)
  }

  // ====================== GET CHATS ======================

  // GET CHATS STATES
  chats = [] as IChat[]
  loading = false

  // GET CHATS ACTIONS
  getChats = async (user: IFriend) => {
    this.setLoading(true)
    try {
      const q = query(collection(db, 'chats'), where('people', 'array-contains', user))
      return onSnapshot(q, querySnapshot => {
        this.setChats(
          querySnapshot.docs.map(
            doc =>
              ({
                chatId: doc.id,
                ...doc.data(),
              } as IChat)
          )
        )
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
  setChats = (chats: IChat[]) => (this.chats = chats)
}

export default new getChatsApi()
