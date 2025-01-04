import { IMessage } from '@/shared/interfaces/IChat'
import s from './index.module.scss'
import { useSliceStr } from '@/shared/hooks/useSliceStr'
import { BarsOutlined, CloseOutlined } from '@ant-design/icons'
import unpinMsgApi from '@/shared/store/api/chats/chat/actions/unpin-msg-api'

export interface PinnedMsgsProps {
  pin: IMessage[]
}

export const PinnedMsgs = ({ pin }: PinnedMsgsProps) => {
  const lengthMoreThan1 = pin.length > 1
  const { unpinMessage } = unpinMsgApi
  return (
    <div className={`${s.pinnedMsgs} flex jcsb aic`}>
      <div className={`${s.pinnedMsgs__msg} flex fdc`}>
        <b>@{pin[0]?.userId}</b>
        <p>{useSliceStr(pin[0]?.message, 15)}</p>
      </div>
      <button onClick={() => (lengthMoreThan1 ? console.log('Open') : unpinMessage(pin[0]))}>
        {lengthMoreThan1 ? <BarsOutlined /> : <CloseOutlined />}
      </button>
    </div>
  )
}
