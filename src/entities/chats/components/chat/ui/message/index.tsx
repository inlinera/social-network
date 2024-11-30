import { IMessage } from '@/shared/interfaces/IChat'
import s from './index.module.scss'

interface ChatMessageUIProps {
  isThisMessageMy: boolean
  message: IMessage
}

export const ChatMessageUI = ({ isThisMessageMy, message }: ChatMessageUIProps) => {
  return (
    <div className={`${isThisMessageMy ? s.myMessage : s.notMyMessage}`}>
      <p>{message.message}</p>
    </div>
  )
}
