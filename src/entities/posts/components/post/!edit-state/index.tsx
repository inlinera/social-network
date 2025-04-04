import s from './index.module.scss'
import { useState } from 'react'

import editPostApi from '@/shared/store/api/posts/post/actions/edit-post-api'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { CarouselUI } from '@/shared/ui/carousel'
import TextArea from 'antd/es/input/TextArea'
import { AddPostImageFeature } from '@/features/posts/add-image'

import { IPost } from '@/shared/interfaces/IPost'

import { error } from '@/shared/data/toastify'

interface PostEditProps {
  post: IPost
  setIsEditing: (_: boolean) => void
}

export const PostEdit = ({ post, setIsEditing }: PostEditProps) => {
  const { submitChanges, loading } = editPostApi

  const [images, setImages] = useState(post?.images)
  const [postVal, setPostVal] = useState(post?.value)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = postVal.trim()

    if (!value) return error('Введите контент поста')
    submitChanges({ ...post!, value, images }, setIsEditing)
  }

  return (
    <form className={`${s.editPost} flex fdc`} onSubmit={handleSubmit}>
      <TextArea
        className={s.editPost__textarea}
        rows={5}
        value={postVal}
        onChange={e => setPostVal(e.target.value)}
        style={{ resize: 'none' }}
      />
      <div className="flex aic">
        <RedButtonUI disabled={loading}>done</RedButtonUI>
        <AddPostImageFeature imgList={images!} setImgList={setImages} />
      </div>
      {post?.images && post.images.length > 0 && (
        <CarouselUI images={images!} setImages={setImages} height={200} edit borderRadius={10} />
      )}
    </form>
  )
}
