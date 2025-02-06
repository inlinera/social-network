import s from './index.module.scss'
// INTERFACES
import { IMessage } from '@/shared/interfaces/IChat'
// DATA
import { items } from '@/shared/data/chats/context'
// COMPONENTS
import { LinkifyText } from '@/shared/ui/parseText'
import { ContextMenuUI } from '@/shared/ui/context-menu'
import { ChatCommonMsgViewUi } from '../common/msg-view'
// HOOKS
import { useSliceStr } from '@/shared/hooks/useSliceStr'
// MOBX
import fontSize from '@/shared/store/functional/settings/visual/font-size'
import { ImageUI } from '@/shared/ui/image'

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
      <div data-id="msg" className="flex aic jcc fdc">
        <ContextMenuUI items={isThisMessageMy ? items(message).my : items(message).notMy}>
          {message.reply && (
            <div onClick={e => e.stopPropagation()}>
              <ChatCommonMsgViewUi id={message.reply.id}>
                <h4>@{message.reply.userId}</h4>
                <p>{useSliceStr(message.reply.message, 9)}</p>
              </ChatCommonMsgViewUi>
            </div>
          )}
          {message.image && <ImageUI src={message.image} alt="" borderRadius={10} />}
          <p>
            <LinkifyText text={message.message} />
          </p>
        </ContextMenuUI>
      </div>
      <b style={{ fontSize: fz - 5 }}>
        {time.hr}:{addZero(`${time.min}`)}, {addZero(`${time.d}`)}/{addZero(`${time.mon + 1}`)}
      </b>
    </div>
  )
}
