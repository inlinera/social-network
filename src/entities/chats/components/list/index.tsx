import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

import authApi from '@/shared/store/api/user/auth/auth-api'
import getChatsApi from '@/shared/store/api/chats/get-chats-api'

import { ChatComponent } from './components/chat'

import { IChat } from '@/shared/interfaces/IChat'

import { useTranslation } from 'react-i18next'

export const ChatsList = observer(() => {
  const { user } = authApi
  const {
    chats: { chats },
    loading: { loading },
  } = getChatsApi

  const { t } = useTranslation()

  return (
    <div className={`${s.chatsList} flex fdc aic`}>
      <div className={`${s.chatsList__up} flex aic`}>
        <h2>{t('chats._')}</h2>
      </div>
      <div data-id="chats" className="scroll">
        {loading
          ? Array.from({ length: 5 }, (_, id) => <ChatComponent loading key={id} />)
          : chats?.map((chat: IChat) => {
              const chatUser = chat.people.find(p => p.displayName !== user?.displayName)
              const lastMessage = chat.messages?.[chat.messages.length - 1]
              const msgDate = new Date(lastMessage?.time)

              return (
                <ChatComponent
                  loading={loading}
                  currChat={chat}
                  chatUser={`${chatUser?.displayName}`}
                  lastMessage={lastMessage}
                  msgDate={msgDate}
                  isTimeVisible
                  key={chat.chatId}
                />
              )
            })}
      </div>
    </div>
  )
})
