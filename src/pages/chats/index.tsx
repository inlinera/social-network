import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import getChatsApi from '@/shared/store/api/chats/get-chats-api'
//COMPONENTS
import { ChatsList, ChatWindow } from '@/entities/chats/index'
import { myUserFriend } from '@/shared/constants/users/my-user-info'

import { setTitle } from '@/shared/constants/setTitle'

const ChatsPage = observer(() => {
  const { user } = authApi
  const { getChats } = getChatsApi

  setTitle('2la chats')

  useEffect(() => {
    if (user?.displayName && user?.avatarUrl) {
      getChats(myUserFriend())
    }
  }, [user?.displayName])

  return (
    <div className={`${s.chatsPage} flex`}>
      <ChatsList />
      <ChatWindow />
    </div>
  )
})

export default ChatsPage
