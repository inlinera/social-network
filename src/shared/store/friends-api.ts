import { makeAutoObservable } from "mobx";
import { db } from "@/app/_providers/firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

import authApi from "./auth-api";
import { IUser } from "../interfaces/IUser";

class FriendsApi {
  constructor() {
    makeAutoObservable(this);
  }

  // ============== FRIENDS ==============

  // ALL FRIENDS STATES
  loading = false;
  error = '';

  // ALL FRIENDS ACTIONS
  sendFriendRequest = async (targetUserId: string) => {
    try {
      this.setLoading(true)

      const myUserId = authApi.user?.uid!

      // Logging user IDs for debugging
      console.log("targetUserId:", targetUserId)
      console.log("myUserId:", myUserId)

      const [targetUserDoc, myUserDoc] = await Promise.all([
        getDoc(doc(db, "users", targetUserId)),
        getDoc(doc(db, "users", myUserId)),
      ])
      // Check if documents exist
      if (!targetUserDoc.exists() || !myUserDoc.exists()) {
        throw new Error("One or both users not found")
      }

      const targetUserData = targetUserDoc.data() as IUser;
      const myUserData = myUserDoc.data() as IUser;

      // Update both users' documents
      await Promise.all([
        updateDoc(doc(db, "users", myUserId), {
          outgoingReq: arrayUnion({
            userId: targetUserDoc.id,
            displayName: targetUserData.displayName,
            avatarUrl: targetUserData.avatarUrl,
          }),
        }),
        updateDoc(doc(db, "users", targetUserId), {
          incomingReq: arrayUnion({
            userId: myUserDoc.id,
            displayName: myUserData.displayName,
            avatarUrl: myUserData.avatarUrl,
          }),
        }),
      ])

      console.log("Friend requests updated")
      authApi.initializeAuth()
    } catch (e: any) {
      this.setError(e)
      console.error("Error sending friend request:", e)
    } finally {
      this.setLoading(false)
    }
  }

  // ALL FRIENDS STATES MOVES
  setLoading = (state: boolean) => (this.loading = state)
  setError = (err: string) => (this.error = err)
}

export default new FriendsApi()