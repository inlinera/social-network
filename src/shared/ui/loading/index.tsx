import s from './index.module.scss'
import { Spin } from 'antd'

interface LoadingUIProps {
  children: React.ReactNode
}

export const LoadingUI = ({ children }: LoadingUIProps) => {
  return (
    <div className="flex fdc jcc aic ">
      <Spin size="large" />
      <p style={{ marginTop: '5px' }} className={s.loading}>
        {children}
      </p>
    </div>
  )
}
