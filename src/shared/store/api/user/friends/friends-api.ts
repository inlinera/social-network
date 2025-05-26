import { makeAutoObservable } from 'mobx'
//FIREBASE
import { db } from '@/app/_providers/firebase'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc, FieldValue } from 'firebase/firestore'
//INTERFACES
import { IFriend } from '@/shared/interfaces/IFriend'
import { error } from '@/shared/data/toastify'

type UpdateUserT = {
  userId: string
  data: {
    [key: string]: FieldValue
  }
}

class FriendsApi {
  constructor() {
    makeAutoObservable(this)
  }

  // ================= FRIENDS ====================

  //ALL FRIENDS STATES
  loading = false

  private async updateUsers(updates: UpdateUserT[]) {
    this.setLoading(true)
    try {
      await Promise.all(updates.map(update => updateDoc(doc(db, 'users', update.userId), update.data)))
    } catch (e) {
      console.error('Error updating users:', e)
      error(e instanceof Error ? e.message : 'Упс, произошла ошибка')
    } finally {
      this.setLoading(false)
    }
  }

  private async getUserData(userId: string) {
    const userDoc = await getDoc(doc(db, 'users', userId))
    return userDoc.data()
  }

  private hasUserInArray(user: IFriend, array?: IFriend[]) {
    return array?.some(item => item.displayName === user.displayName) ?? false
  }

  //ALL FRIENDS ACTIONS
  sendFriendRequest = async (userInfo: IFriend, myUserInfo: IFriend) => {
    if (this.loading) return

    const [userData, myUserData] = await Promise.all([
      this.getUserData(userInfo.displayName),
      this.getUserData(myUserInfo.displayName),
    ])

    if (
      this.hasUserInArray(myUserInfo, userData?.friends) ||
      this.hasUserInArray(userInfo, myUserData?.friends) ||
      this.hasUserInArray(myUserInfo, userData?.incomingReq) ||
      this.hasUserInArray(userInfo, myUserData?.outgoingReq)
    ) {
      return
    }

    await this.updateUsers([
      { userId: myUserInfo.displayName, data: { outgoingReq: arrayUnion(userInfo) } },
      { userId: userInfo.displayName, data: { incomingReq: arrayUnion(myUserInfo) } },
    ])
  }

  acceptFriendRequest = async (userInfo: IFriend, myUserInfo: IFriend) => {
    await this.updateUsers([
      {
        userId: myUserInfo.displayName,
        data: {
          incomingReq: arrayRemove(userInfo),
          friends: arrayUnion(userInfo),
        },
      },
      {
        userId: userInfo.displayName,
        data: {
          outgoingReq: arrayRemove(myUserInfo),
          friends: arrayUnion(myUserInfo),
        },
      },
    ])
  }

  removeFromIncFriends = async (userInfo: IFriend, myUserInfo: IFriend) => {
    await this.updateUsers([
      { userId: myUserInfo.displayName, data: { incomingReq: arrayRemove(userInfo) } },
      { userId: userInfo.displayName, data: { outgoingReq: arrayRemove(myUserInfo) } },
    ])
  }

  removeFromOutFriends = async (userInfo: IFriend, myUserInfo: IFriend) => {
    await this.updateUsers([
      {
        userId: myUserInfo.displayName,
        data: {
          outgoingReq: arrayRemove({ displayName: userInfo.displayName }),
        },
      },
      {
        userId: userInfo.displayName,
        data: {
          incomingReq: arrayRemove({ displayName: myUserInfo.displayName }),
        },
      },
    ])
  }

  removeFromFriends = async (userInfo: IFriend, myUserInfo: IFriend) => {
    await this.updateUsers([
      { userId: myUserInfo.displayName, data: { friends: arrayRemove(userInfo) } },
      { userId: userInfo.displayName, data: { friends: arrayRemove(myUserInfo) } },
    ])
  }

  //ALL FRIENDS STATES MOVES
  setLoading = (state: boolean) => (this.loading = state)
}

export default new FriendsApi()
