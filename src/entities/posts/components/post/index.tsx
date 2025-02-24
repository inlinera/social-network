import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import s from './index.module.scss'
//INTERFACES
import { IPost } from '@/shared/interfaces/IPost'
//COMPONENTS
import { PostBtnLine, DropdownMenuEntity, PostImageList } from '@/entities/posts/'
import { LinkifyText } from '@/shared/ui/parseText'
import { PostTagEntity } from '@/entities/posts/components/post/ui/tags'
import { AvatarUI } from '@/shared/ui/avatar'
import { TextUi } from '@/shared/ui/text'
//MOBX
// HOOKS
import { useGetAvatar } from '@/shared/hooks/details/useGetAvatar'
import authApi from '@/shared/store/api/user/auth/auth-api'
import { PostEdit } from './!edit-state'
import { InView } from 'react-intersection-observer'

interface PostWidgetProps {
  loadingPost: boolean
  post?: IPost
}

export const PostWidget = observer(({ loadingPost, post }: PostWidgetProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [likes, setLikes] = useState<string[]>(post?.likes!)

  const { user } = authApi

  const ruDate = Intl.DateTimeFormat()
  const postDate = new Date(post?.time!)
  const date = ruDate.format(post?.time)

  const handleView = async (inView: boolean) => {
    if (inView && avatar == '') {
      setAvatar(await useGetAvatar(`${post?.userName}`))
    }
  }

  return (
    <InView as="div" onChange={handleView} className={`${s.post} flex fdc`}>
      <div className={`${s.post__upperblock} flex aic`}>
        <div className="flex fdc">
          <Link to={`/user/${post?.userName}`} className={`${s.post_user} flex aic`}>
            <AvatarUI loading={avatar == ''} src={avatar} size={45} />
            <div className="flex fdc">
              <TextUi loading={loadingPost} lines={1}>
                <p style={{ fontSize: document.body.style.fontSize }}>{post?.userName}</p>
              </TextUi>
              <TextUi loading={loadingPost} lines={1}>
                <span className="fz10">
                  {date + ' в ' + postDate.getHours() + ':' + postDate.getMinutes()}
                </span>
              </TextUi>
            </div>
          </Link>
        </div>
        <DropdownMenuEntity postId={`${post?.id}`} setIsEditing={setIsEditing} />
      </div>
      <div className={s.post__mainblock}>
        {isEditing ? (
          <PostEdit post={post!} setIsEditing={setIsEditing} />
        ) : (
          <>
            <TextUi loading={loadingPost} lines={3}>
              <p style={{ fontSize: document.body.style.fontSize }}>
                <LinkifyText text={post?.value!} />
              </p>
            </TextUi>
            <div className={s.post__images}>
              {post?.images && post.images.length > 0 && (
                <PostImageList images={post?.images} />
              )}
            </div>
          </>
        )}
        <PostTagEntity tags={post?.tags!} />
        <PostBtnLine
          likes={likes}
          setLikes={setLikes}
          comments={post?.comments!}
          postId={post?.id!}
          userId={`${user?.displayName}`}
        />
      </div>
    </InView>
  )
})
