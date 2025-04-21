import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

import { IPost } from '@/shared/interfaces/IPost'

import { PostHeader } from './ui/header'
import { PostBtnLine, PostImageList } from '@/entities/posts/'
import { LinkifyText } from '@/shared/ui/parseText'
import { PostTagEntity } from '@/entities/posts/components/post/ui/tags'
import { TextUi } from '@/shared/ui/text'
import { PostEdit } from './!edit-state'

import { postState } from '@/shared/store/functional/posts/edit-state'

export interface PostWidgetProps {
  loadingPost: boolean
  post?: IPost
}

export const PostWidget = observer(({ loadingPost, post }: PostWidgetProps) => {
  const {
    editPost: { editPost },
  } = postState

  return (
    <div className={`${s.post} flex fdc`}>
      <PostHeader loadingPost={loadingPost} post={post} />
      <div className={s.post__mainblock}>
        {editPost === post?.id ? (
          <PostEdit post={post!} />
        ) : (
          <>
            <TextUi loading={loadingPost} lines={3}>
              <p style={{ fontSize: document.body.style.fontSize }}>
                <LinkifyText text={post?.value!} />
              </p>
            </TextUi>
            <div className={s.post__images}>
              {post?.images && post.images.length > 0 && <PostImageList images={post?.images} />}
            </div>
          </>
        )}
        <PostTagEntity tags={post?.tags ?? []} />
        <PostBtnLine id={post?.id!} comments={post?.comments ?? []} likes={post?.likes ?? []} />
      </div>
    </div>
  )
})
