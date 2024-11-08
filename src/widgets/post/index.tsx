import { useState } from 'react'
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
import { DropdownMenuEntity } from '@/entities/posts/dropdown-menu'
import editPostApi from '@/shared/store/edit-post-api'

export const PostWidget = ({ post }: { post: IPost }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [postVal, setPostVal] = useState(post.value)

  const { submitChanges } = editPostApi

  return (
    <div className={`${s.post} grid`}>
      <div className={`${s.post__upperblock} flex aic`}>
        {post.userAvatar && (
          <Link to={`/user/${post.userName}`} className={`${s.post_user} flex aic`}>
            <Avatar size={'default'} src={post.userAvatar} alt="avatar" />
            <p>{post.userName}</p>
          </Link>
        )}
        <DropdownMenuEntity postId={post.id} setIsEditing={setIsEditing} />
      </div>
      {isEditing ? (
        <div>
          <input value={postVal} onChange={e => setPostVal(e.target.value)} />
          <button onClick={() => submitChanges(postVal, setIsEditing)}>done</button>
        </div>
      ) : (
        <p>
          <LinkifyText text={post.value} />
        </p>
      )}
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
