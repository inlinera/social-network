import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const app = initializeApp({
  apiKey: 'AIzaSyCjztCpQ4GkY_SFJuezHsWp9MiVUp7Zpl0',
  authDomain: 'wunderkids-social-network.firebaseapp.com',
  projectId: 'wunderkids-social-network',
  storageBucket: 'wunderkids-social-network.appspot.com',
  messagingSenderId: '3711186429',
  appId: '1:3711186429:web:f76d5517978b6680491594',
})

export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
