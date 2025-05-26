import s from './index.module.scss'

interface LoadingUIProps {
  size?: string
}

export const LoadingUI = ({ size = '48px' }: LoadingUIProps) => {
  return (
    <div className={`${s.loading} flex aic jcc`}>
      <div className={s.loading__circle} style={{ width: size, height: size }} />
    </div>
  )
}
