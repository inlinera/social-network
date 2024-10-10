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
      await Promise.all([
        updateDoc(doc(db, 'users', myUserInfo.displayName), {
          outgoingReq: arrayUnion(userInfo)
        }),
        updateDoc(doc(db, 'users', userInfo?.displayName), {
          incomingReq: arrayUnion(myUserInfo)
        })
      ])
      authApi.initializeAuth()
    } catch (e) {
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }

  acceptFriendRequest = async (userInfo: IFriend, myUserInfo: IFriend) => {
    this.setLoading(true)
    try {
      await Promise.all([
       this.removeFromFriends(userInfo, myUserInfo),
       updateDoc(doc(db, 'users', myUserInfo.displayName), {
        friends: arrayUnion(userInfo)
       }),
       updateDoc(doc(db, 'users', userInfo?.displayName), {
        friends: arrayUnion(myUserInfo)
       })
      ])
      authApi.initializeAuth()
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
         outgoingReq: arrayRemove(userInfo),
         incomingReq: arrayRemove(userInfo)
        }),
        updateDoc(doc(db, 'users', userInfo?.displayName), {
         friends: arrayRemove(myUserInfo),
         incomingReq: arrayRemove(myUserInfo),
         outgoingReq: arrayRemove(myUserInfo)
        })
       ])
       authApi.initializeAuth()
      } catch (e) {
        alert(e)
      } finally {
        this.setLoading(false)
      }
  }

  //ALL FRIENDS STATES MOVES
  setLoading = (state: boolean) => this.loading = state
}

export default new FriendsApi()