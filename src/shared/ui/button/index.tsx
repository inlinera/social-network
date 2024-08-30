import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import s from './index.module.scss';

interface PostBtnProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode
  loading?: boolean
}

export const PostBtn: FC<PostBtnProps> = ({ children, loading, ...props }) => {
  return (
    <button className={`${s.postBtn} ${loading && s.loading} flex aic`} {...props}>
      <span>
        {loading
        ?
        'Loading'
        :
        children
        }
        </span>
    </button>
  )
}