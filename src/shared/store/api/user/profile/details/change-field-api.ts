import { makeAutoObservable } from 'mobx'
//FIREBASE
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/_providers/firebase'

import authApi from '../../auth/auth-api'
import { error, success } from '@/shared/data/toastify'

class EditPrivacySettings {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== EDIT PRIVACY SETTINGS API ===================

  editField = async <T>(data: T, field: string, userId = authApi.user?.displayName) => {
    if (!userId) return error('Мы не смоли найти userId')
    try {
      const userRef = doc(db, 'users', userId)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        await updateDoc(userRef, {
          [field]: data,
        })

        success(`Поле ${field} было успешно изменено`)
      }
    } catch (e) {
      error(`Упс, произошла ошибка при изменении поля ${field}`)
    }
  }
}

export default new EditPrivacySettings()
