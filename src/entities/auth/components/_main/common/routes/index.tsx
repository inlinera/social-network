import s from './index.module.scss'

interface CommonRouteBlockProps {
  children: React.ReactNode
}

export const CommonRouteBlock = ({ children }: CommonRouteBlockProps) => {
  return <span className={s.commonRouteBlock}>{children}</span>
}
