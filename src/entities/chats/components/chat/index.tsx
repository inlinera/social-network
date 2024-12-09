import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
import { Link } from 'react-router-dom'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'
//HOOKS
import { useMobile } from '@/shared/hooks/useMobile'
//COMPONENTS
import { ChatMessageUI } from './ui/message'
import { ChatInputUI } from './ui/input'
import { Avatar, Dropdown } from 'antd'
//ICONS
import { ArrowLeftOutlined, MoreOutlined } from '@ant-design/icons'
import { items } from '@/shared/data/chats/dropdown'

export const ChatWindow = observer(() => {
  const { user } = authApi
  const { chat, setChat } = getChatApi
  const isMobile = useMobile()

  if (isMobile && !chat) return
  const chattingUser = chat?.people.filter(p => p.displayName != authApi.user?.displayName)[0]

  return (
    <div className={`${s.chatWindow} flex fdc ${!chat && 'jcc aic'}`}>
      {chat ? (
        <>
          <div className={`${s.chatWindow__upperblock} flex aic jcsb`}>
            <div className="flex aic">
              {isMobile && (
                <button onClick={() => setChat(null)} className="fz17">
                  <ArrowLeftOutlined />
                </button>
              )}
              <Link
                className={`${s.chatWindow__upperblock__info} flex aic`}
                to={`/user/${chattingUser?.displayName}`}
              >
                <Avatar
                  size={'large'}
                  src={chattingUser?.avatarUrl}
                  alt="avatar"
                  draggable={false}
                />
                <h3>@{chattingUser?.displayName}</h3>
              </Link>
            </div>
            <Dropdown menu={{ items: items() }} trigger={['click']}>
              <button className="fz17">
                <MoreOutlined />
              </button>
            </Dropdown>
          </div>
          <div className={`${s.chat} flex fdc aic`}>
            <i>Here was started your chat with {chattingUser?.displayName}</i>
            {chat.messages.map(m => {
              const isThisMessageMy = m.userId == user?.displayName
              return <ChatMessageUI isThisMessageMy={isThisMessageMy} message={m} key={m.id} />
            })}
          </div>
          <ChatInputUI />
        </>
      ) : (
        'Choose the chat'
      )}
    </div>
  )
})
