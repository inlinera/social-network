import { useState } from 'react'
//MOBX
import createPostApi from '@/shared/store/api/posts/post/actions/create-post-api'
//COMPONENTS
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { Modal, Select, Upload, UploadFile } from 'antd'
import TextArea from 'antd/es/input/TextArea'
//DATA
import { postTags } from '@/shared/data/post-tags'
//HOOKS
import { useFormatInput } from '@/shared/hooks/useFormatInput'
import storageApi from '@/shared/store/api/storage/storage-api'
import { v4 } from 'uuid'

interface UserAddPostModalProps {
  isOpened: boolean
  setIsOpened: (state: boolean) => void
}

export const UserAddPostModal = ({ isOpened, setIsOpened }: UserAddPostModalProps) => {
  const { createPost } = createPostApi
  const { uploadImage } = storageApi
  const [value, setValue] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [imgList, setImgList] = useState<UploadFile[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault()
    if (!value) return alert('Please input something')
    const val = useFormatInput(value)
    if (!val) return alert("Post can't contain only spaces!")

    // Получаем только URL изображений
    const imageUrls = imgList.map(file => file.url).filter(url => url)

    // Создаем пост с контентом, тегами и URL изображений
    await createPost(val, selectedTags, imageUrls as string[])

    // Сбрасываем состояние
    setValue('')
    setSelectedTags([])
    setImgList([])
    setIsOpened(false) // Закрываем модальное окно после отправки
  }

  const handleChange = async (file: File) => {
    const url = await uploadImage(file, 'photos')
    if (!url) {
      throw new Error('Изображение не было загружено')
    }
    const newFile: UploadFile = {
      name: `${imgList.length + 1}`,
      status: 'done',
      url: url,
      uid: v4(),
    }
    setImgList(prev => [...prev, newFile])
  }

  return (
    <Modal
      open={isOpened}
      onCancel={() => setIsOpened(false)}
      footer={null}
      centered
      closeIcon={null}
    >
      <form className="flex fdc aic jcc cw" onSubmit={handleSubmit}>
        <TextArea
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter post content"
          maxLength={300}
          rows={5}
          showCount
          style={{ margin: '20px' }}
        />
        <div>
          <h4>Images:</h4>
          <Upload
            listType="picture-card"
            fileList={imgList}
            onChange={file => handleChange(file.file.response)}
            onRemove={file => {
              setImgList(prev => prev.filter(item => item.uid !== file.uid))
              // DELETE IMAGE FROM FIREBASE
            }}
          >
            {imgList.length >= 8 ? null : <button type="button">Add Image</button>}
          </Upload>
        </div>
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
