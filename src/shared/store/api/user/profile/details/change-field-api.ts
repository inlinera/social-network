import { makeAutoObservable } from 'mobx'
//FIREBASE
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/_providers/firebase'

import authApi from '../../auth/auth-api'

class EditPrivacySettings {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== EDIT PRIVACY SETTINGS API ===================

  editField = async (
    data: boolean | string,
    field: string,
    userId = authApi.user?.displayName
  ) => {
    if (!userId) return alert('Error, cannot find userId')
    try {
      const userRef = doc(db, 'users', userId)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        await updateDoc(userRef, {
          [field]: data,
        })
      }
    } catch (e) {
      alert(e)
    }
  }
}

export default new EditPrivacySettings()
