import { makeAutoObservable } from 'mobx'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/app/_providers/firebase'
//INTERFACES
import { IChat } from '@/shared/interfaces/IChat'
import { error } from '@/shared/data/toastify'
import { mobxState } from 'mobx-toolbox'
import { myUserFriend } from '@/shared/constants/users/my-user-info'

class getChatsApi {
  constructor() {
    makeAutoObservable(this)
  }

  // ====================== GET CHATS ======================

  // GET CHATS STATES
  chats = mobxState<IChat[] | null>(null)('chats')
  loading = mobxState(false)('loading')

  // GET CHATS ACTIONS
  getChats = async (user = myUserFriend()) => {
    this.loading.setLoading(true)
    try {
      const q = query(collection(db, 'chats'), where('people', 'array-contains', user))
      return onSnapshot(q, querySnapshot => {
        this.chats.setChats(
          querySnapshot.docs.map(
            doc =>
              ({
                chatId: doc.id,
                ...doc.data(),
              } as IChat)
          )
        )
      })
    } catch {
      error('Ошибка получения чатов')
    } finally {
      this.loading.setLoading(false)
    }
  }
}

export default new getChatsApi()
