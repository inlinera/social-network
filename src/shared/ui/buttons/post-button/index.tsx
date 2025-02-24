import { ButtonHTMLAttributes } from 'react'
import s from './index.module.scss'

interface PostBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export const PostBtn = ({ children, loading, ...props }: PostBtnProps) => {
  return (
    <button className={`${s.postBtn} ${loading && s.loading} flex aic`} {...props}>
      <span>{loading ? 'Loading' : children}</span>
    </button>
  )
}
