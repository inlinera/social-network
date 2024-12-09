import s from './index.module.scss'

interface ChatCommonMsgViewUiProps {
  children: React.ReactNode
}

export const ChatCommonMsgViewUi = ({ children }: ChatCommonMsgViewUiProps) => {
  return (
    <div className={`${s.editing} flex`}>
      <div className={s.leftBlock} />
      <div>{children}</div>
    </div>
  )
}
