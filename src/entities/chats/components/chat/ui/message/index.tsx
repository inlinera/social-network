import { ContextMenuUI } from '@/shared/ui/context-menu'
import s from './index.module.scss'
import { IMessage } from '@/shared/interfaces/IChat'
import { items } from '@/shared/data/chats/context'

interface ChatMessageUIProps {
  isThisMessageMy: boolean
  message: IMessage
}

export const ChatMessageUI = ({ isThisMessageMy, message }: ChatMessageUIProps) => {
  return (
    <div className={`${isThisMessageMy ? s.myMessage : s.notMyMessage}`}>
      <ContextMenuUI items={items}>
        <p>{message.message}</p>
      </ContextMenuUI>
    </div>
  )
}
