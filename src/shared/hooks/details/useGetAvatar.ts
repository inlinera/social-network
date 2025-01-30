import { db } from '@/app/_providers/firebase'
import { IUser } from '@/shared/interfaces/IUser'
import { doc, getDoc } from 'firebase/firestore'

export const useGetAvatar = async (userId: string) => {
  const data = (await getDoc(doc(db, 'users', userId))).data() as IUser
  return data?.avatarUrl
}
