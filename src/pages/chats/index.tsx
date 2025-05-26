import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import getChatsApi from '@/shared/store/api/chats/get-chats-api'
//COMPONENTS
import { ChatsList, ChatWindow } from '@/entities/chats/index'

import { setTitle } from '@/shared/constants/setTitle'

const ChatsPage = observer(() => {
  const { user } = authApi
  const { getChats } = getChatsApi

  setTitle('chats')

  useEffect(() => {
    if (user?.displayName) {
      getChats()
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
