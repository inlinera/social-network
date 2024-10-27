import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './index.module.scss'
//INTERFACES
import { IPost } from '@/shared/interfaces/IPost'
//DATA
import { token } from '@/shared/token/token'
//COMPONENTS
import { PostImageList } from '@/entities/posts/image/image-list'
import { PostBtnLine } from '@/entities/posts/button-list'
import { Avatar } from 'antd'
import { LinkifyText } from '@/shared/ui/parseText'

export const PostWidget: FC<{ post: IPost }> = ({ post }) => {
  return (
    <div className={`${s.post} grid`}>
      {post.userAvatar && (
        <Link to={`/user/${post.userName}`} className={`${s.post_user} flex aic`}>
          <Avatar size={'default'} src={post.userAvatar} alt="avatar" />
          <p>{post.userName}</p>
        </Link>
      )}
      <p>
        <LinkifyText text={post.value} />
      </p>
      <div className={s.post_images}>
        {post.images && <PostImageList images={post.images} />}
      </div>
      <PostBtnLine
        likes={post.likes}
        comments={post.comments}
        postId={post.id}
        userId={token!}
      />
    </div>
  )
}
