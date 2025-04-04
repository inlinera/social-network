import s from './index.module.scss'
import { useScrollToMsg } from '@/shared/hooks/useScrollToMsg'

interface ChatCommonMsgViewUiProps {
  children: React.ReactNode
  id: string
}

export const ChatCommonMsgViewUi = ({ children, id }: ChatCommonMsgViewUiProps) => {
  return (
    <div className={`${s.editing} flex`} onClick={() => useScrollToMsg(id)}>
      <div className={s.leftBlock} />
      <div>{children}</div>
    </div>
  )
}
