import { makeAutoObservable } from 'mobx'
// FIREBASE
import { auth, db } from '@/app/_providers/firebase'
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
  deleteUser,
  updateProfile,
} from 'firebase/auth'
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore'
// INTERFACES
import { IUser } from '@/shared/interfaces/IUser'
import storageApi from '../../storage/storage-api'
// DATA
import { error, success } from '@/shared/data/toastify'

const handleRegError = (e: unknown) => {
  if (e instanceof Error) {
    const errorMessage = e.message
    if (errorMessage.includes('auth/email-already-in-use')) {
      error('Пользователь с таким email уже существует')
    } else if (errorMessage.includes('auth/invalid-email')) {
      error('Некорректный формат email')
    } else if (errorMessage.includes('auth/network-request-failed')) {
      error('Проверьте подключение к интернету')
    } else {
      error('Произошла ошибка при регистрации')
    }
  } else {
    error('Произошла неизвестная ошибка')
  }
}

class AuthorizationStore {
  constructor() {
    makeAutoObservable(this)
    this.initializeAuth()
  }

  // ======================== AUTH ========================

  //ALL AUTH STATES
  user? = null as IUser | null
  loading = false

  //ALL AUTH ACTIONS
  initializeAuth = async () => {
    this.setLoading(true)
    try {
      await setPersistence(auth, browserLocalPersistence)
      onAuthStateChanged(auth, async user => {
        if (!user) return

        const displayName = user.displayName
        if (!displayName) return

        const userDocRef = doc(db, 'users', displayName)
        onSnapshot(userDocRef, doc => {
          if (doc.exists()) {
            const uid = user.uid
            const updatedUserData = doc.data() as IUser
            this.setUser({ ...updatedUserData, displayName, uid })
          }
        })
      })
    } catch (e) {
      error('Произошла ошибка, проверьте подключение к интернету')
    } finally {
      this.setLoading(false)
    }
  }

  signUp = async (userData: IUser) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password)

      await setDoc(doc(db, 'users', userData.displayName), {
        ...userData,
        password: '********',
        avatarUrl: storageApi.image ?? null,
      }).then(() => {
        updateProfile(user, {
          displayName: userData.displayName,
        })
      })

      this.setUser(user as IUser)

      success('Регистрация прошла успешно!')
    } catch (e) {
      handleRegError(e)
    }
  }

  signIn = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)

      this.setUser(user as IUser)
    } catch {
      error('Произошла ошибка, проверьте введенные данные')
    }
  }

  logout = async () => {
    try {
      await signOut(auth)
      this.setUser(null)

      success('Вы успешно вышли из аккаунта')
    } catch {
      error('Упс, что-то пошло не так')
    }
  }

  changePassword = async (newPass: string, currPass: string) => {
    try {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user) return error('Не удалось определить пользователя.')

      if (currPass) {
        const credential = EmailAuthProvider.credential(`${user.email}`, currPass)
        await Promise.all([reauthenticateWithCredential(user, credential), updatePassword(user, newPass)])

        success('Вы успешно сменили пароль')
      }
    } catch {
      error('Упс, произошла ошибка')
    }
  }

  deleteAccount = async () => {
    try {
      const auth = getAuth()
      const user = auth.currentUser

      if (!user) return error('Не удалось определить пользователя.')
      const q = query(collection(db, 'posts'), where('userName', '==', user.displayName))
      const querySnapshot = await getDocs(q)
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref))
      await Promise.all(deletePromises)

      await deleteDoc(doc(db, 'users', `${user.displayName}`))

      await deleteUser(user)

      this.setUser(null)
      await this.initializeAuth()

      success('Надеюсь вы вернётесь сюда снова')
    } catch {
      error('Упс, произошла ошибка')
    }
  }

  // ALL AUTH STATES MOVES
  setLoading = (state: boolean) => (this.loading = state)
  setUser = (user: IUser | null) => (this.user = user)
}

export default new AuthorizationStore()
