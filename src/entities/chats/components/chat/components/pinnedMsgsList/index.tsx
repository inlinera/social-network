import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

import { PinnedMsgsProps } from '../pinnedMsgs'
import { IMessage } from '@/shared/interfaces/IChat'

import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons'

import unpinMsgApi from '@/shared/store/api/chats/chat/details/unpin-msg-api'
import { chatState } from '@/shared/store/functional/chat/content'

import { useScrollToMsg } from '@/shared/hooks/chats/useScrollToMsg'
import { useTranslation } from 'react-i18next'

export const PinnedMsgsList = observer(({ pin }: PinnedMsgsProps) => {
  const { setIsChat } = chatState
  const { unpinMessage } = unpinMsgApi
  const { t } = useTranslation()

  const buttonClickHandler = (e: React.MouseEvent<HTMLButtonElement>, msg: IMessage) => {
    e.stopPropagation()
    unpinMessage(msg)
  }

  useEffect(() => {
    pin.length === 0 && setIsChat(true)
  }, [pin.length])

  return (
    <div className={`${s.pinnedMsgsList} flex fdc`}>
      <div className={`${s.pinnedMsgsList__head}`}>
        <button onClick={() => setIsChat(true)}>
          <ArrowLeftOutlined /> <span>{t('back')}</span>
        </button>
      </div>
      <div className={`${s.pinnedMsgsList__main} flex fdc scroll`}>
        {pin.map(msg => {
          return (
            <div
              className={`${s.pinnedMsgsList__main_msg} flex jcsb aic`}
              onClick={() => useScrollToMsg(msg.id)}
              key={msg.id}
            >
              <div>
                <b>{msg.userId}</b>
                <p>
                  {msg.image && t('chats.photo')} {msg.message}
                </p>
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
