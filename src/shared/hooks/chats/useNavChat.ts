import createChatApi from '@/shared/store/api/chats/chat/actions/create-chat-api'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { IUser } from '@/shared/interfaces/IUser'
import { db } from '@/app/_providers/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { IFriend } from '@/shared/interfaces/IFriend'
import { error } from '@/shared/data/toastify'

export const useNavChat = async (userInfo: IUser) => {
  const { user } = authApi
  const { createChat } = createChatApi
  const { getChat } = getChatApi

  const chatsRef = collection(db, 'chats')
  const q = query(chatsRef, where('people', 'array-contains', { displayName: user?.displayName }))

  const querySnapshot = await getDocs(q)
  const existingChat = querySnapshot.docs.find(doc => {
    const chatData = doc.data()
    return chatData.people.some((person: IFriend) => person.displayName === userInfo.displayName)
  })

  let chatId: string | undefined
  if (!existingChat) {
    chatId = await createChat(`${userInfo.displayName}`)
  } else {
    chatId = existingChat.id
  }

  if (!chatId) return error('I cannot find chat id')
  getChat(chatId)
}
