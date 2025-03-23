import { useState } from 'react'
import s from './index.module.scss'
//MOBX
import createPostApi from '@/shared/store/api/posts/post/actions/create-post-api'
//COMPONENTS
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import TextArea from 'antd/es/input/TextArea'
import { CarouselUI } from '@/shared/ui/carousel'
import { AddPostImageFeature } from '@/features/posts/add-image'
import { ModalUi, ModalUiProps } from '@/shared/ui/modal'
import { SearchDropdownUi } from './ui/dropdown'
//DATA
import { tags } from './constants'
//HOOKS
import { useFormatInput } from '@/shared/hooks/useFormatInput'

export const UserAddPostModal = ({ isOpened, setIsOpened }: ModalUiProps) => {
  const { createPost } = createPostApi
  const [value, setValue] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [imgList, setImgList] = useState<string[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault()
    if (!value) return alert('Please input something')
    const val = useFormatInput(value)
    if (!val) return alert("Post can't contain only spaces!")

    await createPost(val, selectedTags, imgList).then(() => {
      setValue('')
      setSelectedTags([])
      setImgList([])
      setIsOpened(false)
    })
  }

  return (
    <ModalUi isOpened={isOpened} setIsOpened={setIsOpened} padding={'10px 15px'}>
      <form onSubmit={handleSubmit} className={`${s.modal} flex fdc jcc`}>
        <div className="flex fdc aic">
          <TextArea
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Enter post content"
            maxLength={300}
            rows={5}
            showCount
            style={{ margin: '20px' }}
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
            <RedButtonUI onClick={handleSubmit}>Send</RedButtonUI>
          </div>
        </div>
      </form>
    </ModalUi>
  )
}
