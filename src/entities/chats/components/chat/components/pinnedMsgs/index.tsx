import { IMessage } from '@/shared/interfaces/IChat'
import s from './index.module.scss'
import { useSliceStr } from '@/shared/hooks/useSliceStr'
import { BarsOutlined, CloseOutlined } from '@ant-design/icons'
import unpinMsgApi from '@/shared/store/api/chats/chat/actions/unpin-msg-api'
import { chatState } from '@/shared/store/functional/chat/content'
import { useScrollToMsg } from '@/shared/hooks/useScrollToMsg'

export interface PinnedMsgsProps {
  pin: IMessage[]
}

export const PinnedMsgs = ({ pin }: PinnedMsgsProps) => {
  const lengthMoreThan1 = pin.length > 1
  const { unpinMessage } = unpinMsgApi
  const { setIsChat } = chatState
  return (
    <div className={`${s.pinnedMsgs} flex jcsb aic`}>
      <div
        className={`${s.pinnedMsgs__msg} flex fdc`}
        onClick={() => useScrollToMsg(pin[0].id)}
      >
        <p data-penis="pin">Pinned Message:</p>
        <div>
          <b>@{pin[0]?.userId}: </b>
          <span>{useSliceStr(pin[0]?.message, 15)}</span>
        </div>
      </div>
      <button onClick={() => (lengthMoreThan1 ? setIsChat(false) : unpinMessage(pin[0]))}>
        {lengthMoreThan1 ? <BarsOutlined /> : <CloseOutlined />}
      </button>
    </div>
  )
}
