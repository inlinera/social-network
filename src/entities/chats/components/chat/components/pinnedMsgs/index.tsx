import s from './index.module.scss'

import { IMessage } from '@/shared/interfaces/IChat'

import { BarsOutlined, CloseOutlined } from '@ant-design/icons'

import unpinMsgApi from '@/shared/store/api/chats/chat/details/unpin-msg-api'
import { chatState } from '@/shared/store/functional/chat/content'

import { useScrollToMsg } from '@/shared/hooks/useScrollToMsg'
import { useSliceStr } from '@/shared/hooks/useSliceStr'
import { useTranslation } from 'react-i18next'

export interface PinnedMsgsProps {
  pin: IMessage[]
}

export const PinnedMsgs = ({ pin }: PinnedMsgsProps) => {
  const { unpinMessage } = unpinMsgApi
  const { setIsChat } = chatState
  const { t } = useTranslation()

  const lengthMoreThan1 = pin.length > 1
  const lastPin = pin[pin.length - 1]

  return (
    <div className={`${s.pinnedMsgs} flex jcsb aic`}>
      <div className={`${s.pinnedMsgs__msg} flex fdc`} onClick={() => useScrollToMsg(lastPin?.id)}>
        <p data-penis="pin">{t('chats.window.pin')}:</p>
        <div>
          <b>@{lastPin?.userId}: </b>
          <span>
            {lastPin.image && t('chats.photo')} {useSliceStr(lastPin?.message, 15)}
          </span>
        </div>
      </div>
      <button onClick={() => (lengthMoreThan1 ? setIsChat(false) : unpinMessage(lastPin))}>
        {lengthMoreThan1 ? <BarsOutlined /> : <CloseOutlined />}
      </button>
    </div>
  )
}
