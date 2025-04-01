import { makeAutoObservable, runInAction } from 'mobx'
// FIREBASE
import { auth, db } from '@/app/_providers/firebase'
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
  deleteUser,
} from 'firebase/auth'
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore'
// INTERFACES
import { IUser } from '@/shared/interfaces/IUser'
import storageApi from '../../storage/storage-api'
// DATA
import { error, success } from '@/shared/data/toastify'

class AuthorizationStore {
  constructor() {
    makeAutoObservable(this)
    this.initializeAuth()
  }

  // ======================== AUTH ========================

  //ALL AUTH STATES
  user? = null as IUser | null
  loading = false
  error = ''

  //ALL AUTH ACTIONS
  initializeAuth = async () => {
    this.setLoading(true)
    try {
      await setPersistence(auth, browserLocalPersistence)
      onAuthStateChanged(auth, async user => {
        if (!user) return
        const { displayName } = user as IUser
        const userDocRef = doc(db, 'users', displayName)
        onSnapshot(userDocRef, doc => {
          if (doc.exists()) {
            const updatedUserData = doc.data() as IUser
            this.setUser({ ...updatedUserData, displayName })
          }
        })
      })
      success('Добро пожаловать :)')
    } catch (e) {
      error('Произошла ошибка, проверьте подключение к интернету')
    } finally {
      this.setLoading(false)
    }
  }

  signUp = async (userData: IUser) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
      await Promise.all([
        setDoc(doc(db, 'users', userData.displayName), {
          ...userData,
          password: '********',
          avatarUrl: storageApi.image ? storageApi.image : null,
        }),
        updateProfile(auth.currentUser!, {
          displayName: userData.displayName,
        }),
      ])

      runInAction(() => {
        this.setUser(user as IUser)
        this.setToken(user.displayName!)
      })

      success('Регистрация прошла успешно!')
    } catch {
      error('Серверу лень вас регистрировать')
    }
  }

  signIn = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)

      runInAction(() => {
        this.setUser(user as IUser)
        this.setToken(user?.displayName!)
      })
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

      await Promise.all([
        ...deletePromises,
        deleteDoc(doc(db, 'users', user.displayName!)),
        deleteUser(user),
        this.setUser(null),

        success('Надеюсь вы вернётесь сюда снова'),
        this.initializeAuth(),
      ])
    } catch {
      error('Упс, произошла ошибка')
    }
  }

  // ALL AUTH STATES MOVES
  setLoading = (state: boolean) => (this.loading = state)
  setUser = (user: IUser | null) => (this.user = user)
  setError = (err: string) => (this.error = err)
  setToken = (token: string) => localStorage.setItem('2la-token', token)
}

export default new AuthorizationStore()
