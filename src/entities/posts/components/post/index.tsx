import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import s from './index.module.scss'
//INTERFACES
import { IPost } from '@/shared/interfaces/IPost'
//COMPONENTS
import { PostImageList } from '@/entities/posts/index'
import { PostBtnLine } from '@/entities/posts/index'
import { DropdownMenuEntity } from '@/entities/posts/index'
import { Avatar } from 'antd'
import { LinkifyText } from '@/shared/ui/parseText'
import { PostTagEntity } from '@/entities/posts/components/post/ui/tags'
import TextArea from 'antd/es/input/TextArea'
//MOBX
import editPostApi from '@/shared/store/api/posts/post/actions/edit-post-api'
// HOOKS
import { useGetAvatar } from '@/shared/hooks/details/useGetAvatar'
import authApi from '@/shared/store/api/user/auth/auth-api'

export const PostWidget = observer(({ post }: { post: IPost }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [postVal, setPostVal] = useState(post.value)
  const [avatar, setAvatar] = useState('')

  const { user } = authApi
  const { submitChanges, loading } = editPostApi

  const ruDate = Intl.DateTimeFormat()
  const postDate = new Date(post.time)
  const date = ruDate.format(post.time)
  const avatarUrl = async () => {
    const url = await useGetAvatar(post.userName)
    setAvatar(url)
  }
  avatarUrl()

  return (
    <div className={`${s.post} flex fdc`}>
      <div className={`${s.post__upperblock} flex aic`}>
        <div className="flex fdc">
          {post.userAvatar && (
            <>
              <Link to={`/user/${post.userName}`} className={`${s.post_user} flex aic`}>
                <Avatar size={'large'} src={avatar} alt="avatar" draggable={false} />
                <div className="flex fdc">
                  <p style={{ fontSize: document.body.style.fontSize }}>{post.userName}</p>
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
          <div className={`${s.editPost} flex fdc`}>
            <TextArea
              className={s.editPost__textarea}
              rows={6}
              value={postVal}
              onChange={e => setPostVal(e.target.value)}
            />
            <button
              onClick={() => submitChanges({ ...post, value: postVal }, setIsEditing)}
              disabled={loading}
            >
              done
            </button>
          </div>
        ) : (
          <p style={{ fontSize: document.body.style.fontSize }}>
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
          userId={`${user?.displayName}`}
        />
      </div>
    </div>
  )
})
