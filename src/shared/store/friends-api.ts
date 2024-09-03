import { makeAutoObservable } from "mobx"
//FIREBASE
import { db } from "@/app/_providers/firebase"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
//MOBX
import authApi from "./auth-api"
//INTERFACES
import { IFriend } from "../interfaces/IFriend"

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
      const targetUserId = userInfo?.displayName
      await Promise.all([
        updateDoc(doc(db, 'users', authApi.user?.displayName!), {
          outgoingReq: arrayUnion(userInfo)
        }),
        updateDoc(doc(db, 'users', targetUserId), {
          incomingReq: arrayUnion(myUserInfo)
        })
      ])
    } catch (e: any) {
      alert(`${e}`)
    } finally {
      this.setLoading(false)
    }
  }

  acceptFriendRequest = async (userInfo: IFriend, myUserInfo: IFriend) => {
    this.setLoading(true)
    try {
      const targetUserId = userInfo?.displayName
      await Promise.all([
       updateDoc(doc(db, 'users', authApi.user?.displayName!), {
        outgoingReq: arrayRemove(userInfo),
        friends: arrayUnion(userInfo)
       }),
       updateDoc(doc(db, 'users', targetUserId), {
        outgoingReq: arrayRemove(myUserInfo),
        friends: arrayUnion(myUserInfo)
       })
      ])
    }
    catch (e) {
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }

  //ALL FRIENDS STATES MOVES
  setLoading = (state: boolean) => this.loading = state
}

export default new FriendsApi()