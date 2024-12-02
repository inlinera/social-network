import { ContextMenuUI } from '@/shared/ui/context-menu'
import s from './index.module.scss'
import { IMessage } from '@/shared/interfaces/IChat'

interface ChatMessageUIProps {
  isThisMessageMy: boolean
  message: IMessage
}

export const ChatMessageUI = ({ isThisMessageMy, message }: ChatMessageUIProps) => {
  return (
    <div className={`${isThisMessageMy ? s.myMessage : s.notMyMessage}`}>
      <ContextMenuUI items={[{ name: '1', onClick: () => console.log('1') }]}>
        <p>{message.message}</p>
      </ContextMenuUI>
    </div>
  )
}
