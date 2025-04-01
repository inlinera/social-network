import { makeAutoObservable } from 'mobx'
//FIREBASE
import { db } from '@/app/_providers/firebase'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
import { error } from '@/shared/data/toastify'

class FriendsApi {
  constructor() {
    makeAutoObservable(this)
  }

  // ================= FRIENDS ====================

  //ALL FRIENDS STATES
  loading = false

  //ALL FRIENDS ACTIONS
  sendFriendRequest = async (userInfo: IFriend, myUserInfo: IFriend) => {
    this.setLoading(true)
    try {
      await Promise.all([
        updateDoc(doc(db, 'users', myUserInfo.displayName), {
          outgoingReq: arrayUnion(userInfo),
        }),
        updateDoc(doc(db, 'users', userInfo?.displayName), {
          incomingReq: arrayUnion(myUserInfo),
        }),
      ])
    } catch (e) {
      error('Упс, произошла ошибка')
    } finally {
      this.setLoading(false)
    }
  }

  acceptFriendRequest = async (userInfo: IFriend, myUserInfo: IFriend) => {
    this.setLoading(true)
    try {
      await Promise.all([
        this.removeFromIncFriends(userInfo, myUserInfo),
        updateDoc(doc(db, 'users', myUserInfo.displayName), {
          friends: arrayUnion(userInfo),
        }),
        updateDoc(doc(db, 'users', userInfo?.displayName), {
          friends: arrayUnion(myUserInfo),
        }),
      ])
    } catch (e) {
      error('Упс, произошла ошибка')
    } finally {
      this.setLoading(false)
    }
  }

  removeFromIncFriends = async (userInfo: IFriend, myUserInfo: IFriend) => {
    this.setLoading(true)
    try {
      await Promise.all([
        updateDoc(doc(db, 'users', myUserInfo.displayName), {
          incomingReq: arrayRemove(userInfo),
        }),
        updateDoc(doc(db, 'users', userInfo?.displayName), {
          outgoingReq: arrayRemove(myUserInfo),
        }),
      ])
    } catch (e) {
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }

  removeFromOutFriends = async (userInfo: IFriend, myUserInfo: IFriend) => {
    this.setLoading(true)
    try {
      await Promise.all([
        updateDoc(doc(db, 'users', myUserInfo.displayName), {
          outgoingReq: arrayRemove(userInfo),
        }),
        updateDoc(doc(db, 'users', userInfo?.displayName), {
          incomingReq: arrayRemove(myUserInfo),
        }),
      ])
    } catch (e) {
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }

  removeFromFriends = async (userInfo: IFriend, myUserInfo: IFriend) => {
    this.setLoading(true)
    try {
      await Promise.all([
        updateDoc(doc(db, 'users', myUserInfo.displayName), {
          friends: arrayRemove(userInfo),
          incomingReq: arrayUnion(userInfo),
        }),
        updateDoc(doc(db, 'users', userInfo?.displayName), {
          friends: arrayRemove(myUserInfo),
          outgoingReq: arrayUnion(myUserInfo),
        }),
      ])
    } catch (e) {
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }

  //ALL FRIENDS STATES MOVES
  setLoading = (state: boolean) => (this.loading = state)
}

export default new FriendsApi()
