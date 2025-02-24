import s from './index.module.scss'
import { chatState } from '@/shared/store/functional/chat/content'
import { PinnedMsgsProps } from '../pinnedMsgs'
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons'
import unpinMsgApi from '@/shared/store/api/chats/chat/details/unpin-msg-api'
import { IMessage } from '@/shared/interfaces/IChat'
import { useEffect } from 'react'
import { useScrollToMsg } from '@/shared/hooks/useScrollToMsg'
import { observer } from 'mobx-react-lite'

export const PinnedMsgsList = observer(({ pin }: PinnedMsgsProps) => {
  const { setIsChat } = chatState
  const { unpinMessage } = unpinMsgApi
  const buttonClickHandler = (e: React.MouseEvent<HTMLButtonElement>, msg: IMessage) => {
    e.stopPropagation()
    unpinMessage(msg)
  }
  useEffect(() => {
    pin.length == 0 && setIsChat(true)
  }, [pin.length])

  return (
    <div className={`${s.pinnedMsgsList} flex fdc`}>
      <div className={`${s.pinnedMsgsList__head}`}>
        <button onClick={() => setIsChat(true)}>
          <ArrowLeftOutlined /> <span>Back</span>
        </button>
      </div>
      <div className={`${s.pinnedMsgsList__main} flex fdc`}>
        {pin.map(msg => {
          return (
            <div
              className={`${s.pinnedMsgsList__main_msg} flex jcsb aic`}
              onClick={() => useScrollToMsg(msg.id)}
              key={msg.id}
            >
              <div>
                <b>{msg.userId}</b>
                <p>{msg.message}</p>
              </div>
              <button className="flex jcc aic" onClick={e => buttonClickHandler(e, msg)}>
                <CloseOutlined />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
})
