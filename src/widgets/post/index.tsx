import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './index.module.scss'
//INTERFACES
import { IPost } from '@/shared/interfaces/IPost'
import { PostBtnLine } from '@/entities/postButtons'
import { Avatar } from 'antd'
import { LinkifyText } from '@/entities/parseText'

export const PostWidget: FC<{ post: IPost }> = ({ post }) => {

  return (
    <div className={`${s.post} flex fdc jcc`}>
            <Link to={`/user/${post.userId}`}>
              <Avatar size={'default'} icon={<img src={post.userAvatar} alt='avatar'/>}/>
              <span>{post.username}</span>
            </Link>
        <p>
            <LinkifyText text={post.value}/>
        </p>
          <PostBtnLine likes={post.likes} postId={post.id!} userId={post.userId}/>
    </div>
  )
}
