import { useState } from 'react'
import { Link } from 'react-router-dom'
import s from './index.module.scss'
//INTERFACES
import { IPost } from '@/shared/interfaces/IPost'
//DATA
import { token } from '@/shared/token/token'
//COMPONENTS
import { PostImageList } from '@/entities/posts/index'
import { PostBtnLine } from '@/entities/posts/index'
import { DropdownMenuEntity } from '@/entities/posts/index'
import { Avatar } from 'antd'
import { LinkifyText } from '@/shared/ui/parseText'
import { PostTagEntity } from '@/entities/posts/ui/tags'
//MOBX
import editPostApi from '@/shared/store/api/posts/post/actions/edit-post-api'

export const PostWidget = ({ post }: { post: IPost }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [postVal, setPostVal] = useState(post.value)

  const { submitChanges } = editPostApi

  const ruDate = Intl.DateTimeFormat()
  const postDate = new Date(post.time)
  const date = ruDate.format(post.time)

  return (
    <div className={`${s.post} grid`}>
      <div className={`${s.post__upperblock} flex aic`}>
        <div className="flex fdc">
          {post.userAvatar && (
            <>
              <Link to={`/user/${post.userName}`} className={`${s.post_user} flex aic`}>
                <Avatar
                  size={'default'}
                  src={post.userAvatar}
                  alt="avatar"
                  draggable={false}
                />
                <div className="flex fdc">
                  <p>{post.userName}</p>
                  <span className="fz10">
                    {date + ' в ' + postDate.getHours() + ':' + postDate.getMinutes()}
                  </span>
                </div>
              </Link>
            </>
          )}
        </div>
        <DropdownMenuEntity postId={post.id} setIsEditing={setIsEditing} />
      </div>
      <div className={s.post__mainblock}>
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
        <div className={s.post__images}>
          {post.images && <PostImageList images={post.images} />}
        </div>
        <PostTagEntity tags={post.tags} />
        <PostBtnLine
          likes={post.likes}
          comments={post.comments}
          postId={post.id}
          userId={token!}
        />
      </div>
    </div>
  )
}
