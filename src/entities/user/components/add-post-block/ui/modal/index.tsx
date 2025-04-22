import { useState } from 'react'
import s from './index.module.scss'

import createPostApi from '@/shared/store/api/posts/post/actions/create-post-api'

import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import TextArea from 'antd/es/input/TextArea'
import { CarouselUI } from '@/shared/ui/carousel'
import { AddPostImageFeature } from '@/features/posts/add-image'
import { ModalUi, ModalUiProps } from '@/shared/ui/modal'
import { SearchDropdownUi } from './ui/dropdown'

import { tags } from './constants'

import { formatInput } from '@/shared/constants/formatInput'

import { error } from '@/shared/data/toastify'

import { useTranslation } from 'react-i18next'
import { TagT } from '@/shared/interfaces/IPost'

export const UserAddPostModal = ({ isOpened, setIsOpened }: ModalUiProps) => {
  const { createPost } = createPostApi
  const { t } = useTranslation()

  const [value, setValue] = useState('')
  const [selectedTags, setSelectedTags] = useState<TagT[]>([])
  const [imgList, setImgList] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()

    const val = formatInput(value)
    if (!val) return error('Введите контент поста')

    await createPost(val, selectedTags, imgList).then(() => {
      setValue('')
      setSelectedTags([])
      setImgList([])
      setIsOpened(false)
    })
  }

  return (
    <ModalUi isOpened={isOpened} setIsOpened={setIsOpened} padding={'10px 15px'}>
      <form onSubmit={handleSubmit} className={`${s.modal} flex fdc jcc scroll`}>
        <div className="flex fdc aic">
          <TextArea
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={t('profile.posts.add_post.modal.content')}
            maxLength={300}
            rows={5}
            showCount
            style={{ margin: '20px', resize: 'none' }}
          />
        </div>
        {imgList.length > 0 && (
          <div className={`${s.carousel}`}>
            <CarouselUI images={imgList} height={200} borderRadius={16} setImages={setImgList} edit />
          </div>
        )}
        <div className={`${s.buttons} flex aic jcsb`}>
          <SearchDropdownUi items={tags} selectedItems={selectedTags} setSelectedItems={setSelectedTags} />
          <div className="flex aic">
            <AddPostImageFeature imgList={imgList} setImgList={setImgList} />
            <RedButtonUI onClick={handleSubmit}>{t('profile.posts.add_post.modal.send')}</RedButtonUI>
          </div>
        </div>
      </form>
    </ModalUi>
  )
}
