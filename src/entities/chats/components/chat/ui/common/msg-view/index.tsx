import s from './index.module.scss'

interface ChatCommonMsgViewUiProps {
  children: React.ReactNode
}

export const ChatCommonMsgViewUi = ({ children }: ChatCommonMsgViewUiProps) => {
  return <div className={`${s.editing}`}>{children}</div>
}
