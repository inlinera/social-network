import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './index.module.scss'
//INTERFACES
import { IPost } from '@/shared/interfaces/IPost'

export const PostWidget: FC<IPost> = ({userId, username, value}) => {

  return (
    <div className={`${s.post} flex fdc`}>
            <Link to={`/user/${userId}`}>{username}</Link>
        <p>
            {value}
        </p>
    </div>
  )
}
