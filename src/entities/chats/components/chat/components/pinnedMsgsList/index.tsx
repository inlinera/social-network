import s from './index.module.scss'
import { chatState } from '@/shared/store/functional/chat/content'
import { PinnedMsgsProps } from '../pinnedMsgs'
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons'
import unpinMsgApi from '@/shared/store/api/chats/chat/actions/unpin-msg-api'
import { IMessage } from '@/shared/interfaces/IChat'
import { useEffect } from 'react'
import getChatApi from '@/shared/store/api/chats/chat/get-chat-api'

export const PinnedMsgsList = ({ pin }: PinnedMsgsProps) => {
  const { setIsChat } = chatState
  const { unpinMessage } = unpinMsgApi

  const { chat } = getChatApi
  const useScrollToMsg = (id: string) => {
    setIsChat(true)
    const tgtMsg = chat?.messages.find(m => m.id == id)
    if (tgtMsg) {
      setTimeout(() => {
        const targetElement = document.getElementById(`${id}`)
        if (!targetElement) return alert('Message is not found')
        targetElement.classList.add('highlighted')
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setTimeout(() => {
          targetElement.classList.remove('highlighted')
        }, 1100)
      }, 10)
    }
  }
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
      <div className={`${s.pinnedMsgsList__main} felx fdc`}>
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
}
