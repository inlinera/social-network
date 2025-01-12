import { useState } from 'react'
//MOBX
import createPostApi from '@/shared/store/api/posts/post/actions/create-post-api'
//COMPONENTS
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { Modal, Select, Upload, UploadFile, UploadProps } from 'antd'
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

    const imageUrls = imgList.map(file => file.url)?.filter(url => url)

    createPost(val, selectedTags, imageUrls as string[])
    setValue('')
    setSelectedTags([])
    setImgList([])
  }

  const handleChange: UploadProps['onChange'] = async ({ fileList }) => {
    const newFileList: UploadFile[] = await Promise.all(
      fileList.map(async file => {
        if (file.status === 'done') {
          return { ...file, url: file.response.url }
        }
        return file
      })
    )

    setImgList(newFileList)
  }

  const beforeUpload = async (file: File) => {
    const url = await uploadImage(file, 'photos')
    const newFile: UploadFile = {
      uid: v4(),
      name: file.name,
      status: url ? 'done' : 'error',
      url: url as string,
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
            onChange={handleChange}
            beforeUpload={beforeUpload} // Используем beforeUpload для загрузки изображения
            onRemove={file => {
              setImgList(prev => prev.filter(item => item.uid !== file.uid))
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
