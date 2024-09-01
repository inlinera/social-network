import { makeAutoObservable } from "mobx"
import { db } from "@/app/_providers/firebase"
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore/lite"

import authApi from "./auth-api"
import { IUser } from "../interfaces/IUser"
import { IFriend } from "../interfaces/IFriend"
class FriendsApi {
  loading = false
  error = ""

  constructor() {
    makeAutoObservable(this);
  }

  sendFriendRequest = async (targetUserId: string) => {
    try {
      this.setLoading(true);

      const [targetUserData, myUserData] = await Promise.all([
        this.getUserData(targetUserId),
        this.getUserData(authApi.user?.uid!),
      ])

      await Promise.all([
        updateDoc(doc(db, "users", authApi.user?.uid!), {
          outgoingReq: arrayUnion({
            userId: targetUserId,
            displayName: targetUserData.displayName,
            avatarUrl: targetUserData.avatarUrl,
          } as IFriend),
        }),
        updateDoc(doc(db, "users", targetUserId), {
          incomingReq: arrayUnion({
            userId: authApi.user?.uid!,
            displayName: myUserData.displayName,
            avatarUrl: myUserData.avatarUrl,
          } as IFriend),
        }),
      ])

      authApi.initializeAuth()
    } catch (e: any) {
      this.setError(e.message)
    } finally {
      this.setLoading(false)
    }
  };

  acceptFriendRequest = async (targetUserId: string) => {
    // ... your implementation ...
  };

  getUserData = async (userId: string) => {
    const userDoc = await getDoc(doc(db, "users", userId))
    if (!userDoc.exists()) {
      throw new Error("User not found")
    }
    return userDoc.data() as IUser
  }

  setLoading = (state: boolean) => (this.loading = state);

  setError = (err: string) => (this.error = err);
}

export default new FriendsApi();