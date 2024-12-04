import { IMessage } from '@/shared/interfaces/IChat'
import s from './index.module.scss'
import { IFriend } from '@/shared/interfaces/IFriend'
import { Avatar } from 'antd'
import authApi from '@/shared/store/auth-api'
import { useMobile } from '@/shared/hooks/useMobile'
import { observer } from 'mobx-react-lite'
import { ChatMessageUI } from './ui/message'
import { ChatInputUI } from './ui/input'
import { ArrowLeftOutlined, LeftOutlined, MoreOutlined } from '@ant-design/icons'

export interface ChatWindowProps {
  people?: IFriend
  messages?: IMessage[]
  setChat: (_: ChatWindowProps | null) => void
}

export const ChatWindow = observer(({ people, messages, setChat }: ChatWindowProps) => {
  const { user } = authApi
  const isMobile = useMobile()

  const isExists = people || messages

  return (
    <div className={`${s.chatWindow} flex fdc ${!isExists && 'jcc aic'}`}>
      {isExists ? (
        <>
          <div className={`${s.chatWindow__upperblock} flex aic jcsb`}>
            <div className="flex aic">
              {isMobile && (
                <button onClick={() => setChat(null)} className="fz17">
                  <ArrowLeftOutlined />
                </button>
              )}
              <div className={`${s.chatWindow__upperblock__info} flex aic`}>
                <Avatar
                  size={'large'}
                  src={people?.avatarUrl}
                  alt="avatar"
                  draggable={false}
                />
                <h3>{people?.displayName}</h3>
              </div>
            </div>
            <button className="fz17">
              <MoreOutlined />
            </button>
          </div>
          <div className={`${s.chat} flex fdc jcc aic`}>
            <br /> <br /> <br />
            <i>Here was started your chat with {people?.displayName}</i>
            {messages?.map(m => {
              const isThisMessageMy = m.userId == user?.displayName
              return <ChatMessageUI isThisMessageMy={isThisMessageMy} message={m} />
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
