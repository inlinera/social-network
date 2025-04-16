import { db } from '@/app/_providers/firebase'
import { AvatarT } from '@/shared/constants/components-observer/handleView'
import { IUser } from '@/shared/interfaces/IUser'
import { doc, getDoc } from 'firebase/firestore'

export const useGetAvatar = async (userId: string) => {
  const docSnap = await getDoc(doc(db, 'users', userId))
  if (docSnap.exists()) {
    const data = docSnap.data() as IUser
    return data?.avatarUrl as AvatarT
  }
  return null
}
