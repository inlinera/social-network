import { makeAutoObservable } from 'mobx'
//FIREBASE
import { db } from '@/app/_providers/firebase'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'

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
      this.removeFromFriends(userInfo)
      await Promise.all([
        updateDoc(doc(db, 'users', myUserInfo.displayName), {
          outgoingReq: arrayUnion(userInfo),
        }),
        updateDoc(doc(db, 'users', userInfo?.displayName), {
          incomingReq: arrayUnion(myUserInfo),
        }),
      ])
    } catch (e) {
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }

  acceptFriendRequest = async (userInfo: IFriend, myUserInfo: IFriend) => {
    this.setLoading(true)
    try {
      this.removeFromFriends(userInfo)
      await updateDoc(doc(db, 'users', myUserInfo.displayName), {
        friends: arrayUnion(userInfo),
      })
      await updateDoc(doc(db, 'users', userInfo?.displayName), {
        friends: arrayUnion(myUserInfo),
      })
    } catch (e) {
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }

  removeFromFriends = async (userInfo: IFriend) => {
    this.setLoading(true)
    try {
      const myUserInfo: IFriend = {
        displayName: `${authApi.user?.displayName}`,
      }
      await updateDoc(doc(db, 'users', myUserInfo.displayName), {
        friends: arrayRemove(userInfo),
        outgoingReq: arrayRemove(userInfo),
        incomingReq: arrayRemove(userInfo),
      })
      console.log(userInfo, myUserInfo)
      await updateDoc(doc(db, 'users', userInfo?.displayName), {
        friends: arrayRemove(myUserInfo),
        incomingReq: arrayRemove(myUserInfo),
        outgoingReq: arrayRemove(myUserInfo),
      })
      console.log('deleted')
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
