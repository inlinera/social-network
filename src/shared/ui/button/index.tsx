import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import s from './index.module.scss';

interface PostBtnProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode
}

export const PostBtn: FC<PostBtnProps> = ({ children, ...props }) => {
  return (
    <button className={`${s.postBtn} flex aic`} {...props}>
      <span>{children}</span>
    </button>
  )
}