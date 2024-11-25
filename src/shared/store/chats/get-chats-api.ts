import { makeAutoObservable } from 'mobx'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/app/_providers/firebase'
import { IChat } from '@/shared/interfaces/IChat'

class getChatsApi {
  constructor() {
    makeAutoObservable(this)
  }

  // ====================== GET CHATS ======================

  // GET CHATS STATES
  chats? = [] as IChat[]
  loading = false

  // GET CHATS ACTIONS
  getChats = async (userId: string) => {
    this.setLoading(true)
    console.log(userId)
    try {
      const q = query(collection(db, 'chats'), where('people', 'array-contains', userId))
      return onSnapshot(q, querySnapshot =>
        this.setChats(querySnapshot.docs.map(doc => doc.data() as IChat))
      )
    } catch (e) {
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }
  // GET CHATS STATE MOVES
  setLoading = (state: boolean) => (this.loading = state)
  setChats = (posts: IChat[]) => (this.chats = posts)
}

export default new getChatsApi()
