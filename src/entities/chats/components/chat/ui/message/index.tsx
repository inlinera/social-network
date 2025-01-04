import { ContextMenuUI } from '@/shared/ui/context-menu'
import s from './index.module.scss'
import { IMessage } from '@/shared/interfaces/IChat'
import { items } from '@/shared/data/chats/context'
import { LinkifyText } from '@/shared/ui/parseText'
import { ChatCommonMsgViewUi } from '../common/msg-view'
import { useSliceStr } from '@/shared/hooks/useSliceStr'
import fontSize from '@/shared/store/functional/settings/visual/font-size'

interface ChatMessageUIProps {
  isThisMessageMy: boolean
  message: IMessage
}

export const ChatMessageUI = ({ isThisMessageMy, message }: ChatMessageUIProps) => {
  const msgDate = new Date(message?.time)
  const time = {
    mon: msgDate.getMonth(),
    d: msgDate.getDate(),
    hr: msgDate.getHours(),
    min: msgDate.getMinutes(),
  }
  const addZero = (_: string) => (_.length == 1 ? `0${_}` : _)
  const { fz } = fontSize
  return (
    <div className={`${isThisMessageMy ? s.myMessage : s.notMyMessage}`} id={message.id}>
      {message.reply && (
        <ChatCommonMsgViewUi id={message.reply.id}>
          <h4>@{message.reply.userId}</h4>
          <p>{useSliceStr(message.reply.message, 9)}</p>
        </ChatCommonMsgViewUi>
      )}
      <ContextMenuUI items={isThisMessageMy ? items(message).my : items(message).notMy}>
        <p>
          <LinkifyText text={message.message} />
        </p>
      </ContextMenuUI>
      <b style={{ fontSize: fz - 5 }}>
        {time.hr}:{addZero(`${time.min}`)}, {addZero(`${time.d}`)}/{addZero(`${time.mon}`)}
      </b>
    </div>
  )
}
