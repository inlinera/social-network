import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import getChatsApi from '@/shared/store/api/chats/get-chats-api'
//COMPONENTS
import { ChatsList, ChatWindow } from '@/entities/chats/index'

export const ChatsPage = observer(() => {
  const { user } = authApi
  const { getChats } = getChatsApi

  useEffect(() => {
    if (user?.displayName && user?.avatarUrl) {
      getChats({
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
      })
    }
  }, [user?.displayName])

  return (
    <div className={`${s.chatsPage} flex`}>
      <ChatsList />
      <ChatWindow />
    </div>
  )
})
