import { useState } from 'react'
import s from './index.module.scss'
//MOBX
import createPostApi from '@/shared/store/api/posts/post/actions/create-post-api'
//COMPONENTS
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { Modal, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
//DATA
import { postTags } from '@/shared/data/post-tags'
//HOOKS
import { useFormatInput } from '@/shared/hooks/useFormatInput'
import storageApi from '@/shared/store/api/storage/storage-api'
import { CarouselUI } from '@/shared/ui/carousel'

interface UserAddPostModalProps {
  isOpened: boolean
  setIsOpened: (state: boolean) => void
}

export const UserAddPostModal = ({ isOpened, setIsOpened }: UserAddPostModalProps) => {
  const { createPost } = createPostApi
  const { uploadImage } = storageApi
  const [value, setValue] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [imgList, setImgList] = useState<string[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault()
    if (!value) return alert('Please input something')
    const val = useFormatInput(value)
    if (!val) return alert("Post can't contain only spaces!")

    await createPost(val, selectedTags, imgList)

    setValue('')
    setSelectedTags([])
    setImgList([])
    setIsOpened(false)
  }

  const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.log(files)
    if (!files) return
    const url = await uploadImage(files?.[files.length - 1]!, 'photos')
    console.log(url)
    if (!url) return alert('cannot upload img')
    setImgList(imgs => [...imgs, url])
    console.log(imgList)
  }

  return (
    <Modal
      open={isOpened}
      onCancel={() => setIsOpened(false)}
      footer={null}
      centered
      closeIcon={null}
    >
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
          <div className="flex fdc aic jcc">
            <h4>Images:</h4>
            <input
              type="file"
              id="file"
              accept="image/*"
              hidden
              onChange={handleUpdate}
              multiple
            />
            <label htmlFor="file">Choose Img</label>
          </div>
        </div>
        {imgList.length > 0 && (
          <div className={`${s.carousel}`}>
            <CarouselUI
              images={imgList}
              height={200}
              borderRadius={16}
              setImages={setImgList}
            />
          </div>
        )}
        <div className="flex aic jcsb" style={{ width: '100%' }}>
          <div>
            <span>Tag: </span>
            <Select
              mode="multiple"
              placeholder="Choose tags"
              style={{ width: 120, height: 'inherit' }}
              options={postTags}
              onChange={setSelectedTags}
              maxCount={4}
            />
          </div>
          <div className="flex aic">
            <RedButtonUI onClick={handleSubmit}>Send</RedButtonUI>
          </div>
        </div>
      </form>
    </Modal>
  )
}
