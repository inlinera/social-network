import createChatApi from '@/shared/store/api/chats/chat/actions/create-chat-api'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { IUser } from '@/shared/interfaces/IUser'

export const useNavChat = async (userInfo: IUser) => {
  const { user } = authApi
  const { createChat } = createChatApi
  const { getChat } = getChatApi
  const isDMExists = user?.chats?.some(id => userInfo?.chats?.includes(id))

  let chatId: string | undefined
  if (!isDMExists) {
    chatId = await createChat(`${userInfo.displayName}`)
  } else {
    chatId = user?.chats.find(id => userInfo?.chats.includes(id))
  }
  if (!chatId) return alert('ERROR I CANNOT FIND CHAT ID')
  getChat(chatId)
}
