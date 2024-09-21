import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './index.module.scss'
//INTERFACES
import { IPost } from '@/shared/interfaces/IPost'
import { PostBtnLine } from '@/entities/posts/button-list'
import { Avatar } from 'antd'
import { LinkifyText } from '@/shared/ui/parseText'
//DATA
import { token } from '@/shared/token/token'

export const PostWidget: FC<{ post: IPost }> = ({ post }) => {

  return (
    <div className={`${s.post} grid`}>
      {post.userAvatar 
      &&
        <Link to={`/user/${post.userName}`} className={`${s.post_user} flex aic`}>
          <Avatar size={'default'} src={post.userAvatar} alt='avatar'/>
          <p>{post.userName}</p>
        </Link>
      }
      <p>
        <LinkifyText text={post.value} />
      </p>
      <PostBtnLine likes={post.likes} postId={post.id!} userId={token!} />
    </div>
  )
}
