import { useMemo, useState } from 'react'
import s from './index.module.scss'
//MOBX
import createPostApi from '@/shared/store/api/posts/post/actions/create-post-api'
//COMPONENTS
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import TextArea from 'antd/es/input/TextArea'
import { CarouselUI } from '@/shared/ui/carousel'
import { AddPostImageFeature } from '@/features/posts/add-image'
import { ModalUi } from '@/shared/ui/modal'
import { SearchDropdownUi } from '@/shared/ui/dropdown'
//DATA
import { tags } from './constants'
//HOOKS
import { useFormatInput } from '@/shared/hooks/useFormatInput'
import { useMobile } from '@/shared/hooks/useMobile'

interface UserAddPostModalProps {
  setIsOpened: (state: boolean) => void
}

export const UserAddPostModal = ({ setIsOpened }: UserAddPostModalProps) => {
  const { createPost } = createPostApi
  const [value, setValue] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [imgList, setImgList] = useState<string[]>([])
  const isMobile = useMobile()

  const handleSubmit = useMemo(
    () => async (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
      event.preventDefault()
      if (!value) return alert('Please input something')
      const val = useFormatInput(value)
      if (!val) return alert("Post can't contain only spaces!")

      await createPost(val, selectedTags, imgList)

      setValue('')
      setSelectedTags([])
      setImgList([])
      setIsOpened(false)
    },
    []
  )

  return (
    <ModalUi setIsOpened={setIsOpened} padding={'10px 15px'}>
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
        <div className={`${s.buttons} flex aic jcsb`} style={{ width: '100%' }}>
          <div>
            {!isMobile && <span>Tag: </span>}
            <SearchDropdownUi items={tags} selectedItems={selectedTags} setSelectedItems={setSelectedTags} />
          </div>
          <div className="flex aic">
            <AddPostImageFeature imgList={imgList} setImgList={setImgList} />
            <RedButtonUI onClick={handleSubmit}>Send</RedButtonUI>
          </div>
        </div>
      </form>
    </ModalUi>
  )
}
