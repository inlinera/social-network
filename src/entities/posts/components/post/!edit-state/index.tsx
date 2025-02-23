import { AddPostImageFeature } from '@/features/posts/add-image'
import s from './index.module.scss'
import editPostApi from '@/shared/store/api/posts/post/actions/edit-post-api'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { CarouselUI } from '@/shared/ui/carousel'
import TextArea from 'antd/es/input/TextArea'
import { IPost } from '@/shared/interfaces/IPost'
import { useState } from 'react'

interface PostEditProps {
  post: IPost
  setIsEditing: (_: boolean) => void
}

export const PostEdit = ({ post, setIsEditing }: PostEditProps) => {
  const { submitChanges, loading } = editPostApi
  const [images, setImages] = useState(post?.images)
  const [postVal, setPostVal] = useState(post?.value)

  return (
    <div className={`${s.editPost} flex fdc`}>
      <TextArea
        className={s.editPost__textarea}
        rows={6}
        value={postVal}
        onChange={e => setPostVal(e.target.value)}
      />
      <div className="flex aic">
        <RedButtonUI
          onClick={() =>
            submitChanges({ ...post!, value: `${postVal}`, images }, setIsEditing)
          }
          disabled={loading}
        >
          done
        </RedButtonUI>
        <AddPostImageFeature imgList={images!} setImgList={setImages} />
      </div>
      {post?.images && post.images.length > 0 && (
        <CarouselUI
          images={images!}
          setImages={setImages}
          height={200}
          edit
          borderRadius={10}
        />
      )}
    </div>
  )
}
