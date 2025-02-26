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
import { ImageUI } from '@/shared/ui/image'

interface ChatMessageUIProps {
  isThisMessageMy: boolean
  message: IMessage
  setSelectedImg: (_: string | null) => void
}

export const ChatMessageUI = ({
  isThisMessageMy,
  message,
  setSelectedImg,
}: ChatMessageUIProps) => {
  const msgDate = new Date(message?.time)
  const time = {
    mon: msgDate.getMonth(),
    d: msgDate.getDate(),
    hr: msgDate.getHours(),
    min: msgDate.getMinutes(),
  }
  const addZero = (_: string) => (_.length == 1 ? `0${_}` : _)
  const handleOpenImage = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation()
    setSelectedImg(`${message.image}`)
  }

  return (
    <div className={`${isThisMessageMy ? s.myMessage : s.notMyMessage}`} id={message.id}>
      <ContextMenuUI items={isThisMessageMy ? items(message).my : items(message).notMy}>
        <div data-id="msg" className="flex aic jcc fdc">
          {message.reply && (
            <div onClick={e => e.stopPropagation()}>
              <ChatCommonMsgViewUi id={message.reply.id}>
                <h4>@{message.reply.userId}</h4>
                <p>{useSliceStr(message.reply.message, 9)}</p>
              </ChatCommonMsgViewUi>
            </div>
          )}
          <div className={s.image}>
            {message.image && (
              <ImageUI
                src={message.image}
                alt=""
                borderRadius={10}
                onClick={handleOpenImage}
              />
            )}
          </div>
          <p>
            <LinkifyText text={message.message} />
          </p>
        </div>
      </ContextMenuUI>
      <b style={{ fontSize: parseInt(document.body.style.fontSize) - 5 }}>
        {time.hr}:{addZero(`${time.min}`)}, {addZero(`${time.d}`)}/{addZero(`${time.mon + 1}`)}
      </b>
    </div>
  )
}
