import { ContextMenuUI } from '@/shared/ui/context-menu'
import s from './index.module.scss'
import { IMessage } from '@/shared/interfaces/IChat'
import { items } from '@/shared/data/chats/context'
import { LinkifyText } from '@/shared/ui/parseText'

interface ChatMessageUIProps {
  isThisMessageMy: boolean
  message: IMessage
}

export const ChatMessageUI = ({ isThisMessageMy, message }: ChatMessageUIProps) => {
  const msgDate = new Date(message?.time)
  return (
    <div className={`${isThisMessageMy ? s.myMessage : s.notMyMessage}`}>
      <ContextMenuUI items={isThisMessageMy ? items(message).my : items(message).notMy}>
        <p>
          <LinkifyText text={message.message} />
        </p>
        <i className="fz10">
          {msgDate.getHours()}:{msgDate.getMinutes()}
        </i>
      </ContextMenuUI>
    </div>
  )
}
