import { useState } from 'react'
import { Modal, Select, SelectProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import createPostApi from '@/shared/store/create-post-api'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { postTags } from '@/shared/data/post-tags'

interface UserAddPostModalProps {
  isOpened: boolean
  setIsOpened: (state: boolean) => void
}

export const UserAddPostModal = ({ isOpened, setIsOpened }: UserAddPostModalProps) => {
  const { createPost } = createPostApi
  const [value, setValue] = useState('')
  const [selectedTags, setSelectedTags] = useState<SelectProps['options'] | string[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault()
    if (!value) return
    createPost(value, selectedTags as string[])
    setValue('')
    setSelectedTags([])
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
        <div className="flex aic jcsb" style={{ width: '100%' }}>
          <div>
            <span>Tag: </span>
            <Select
              mode="multiple"
              placeholder="Choose tags"
              style={{ width: 120, height: 'inherit' }}
              options={postTags}
              onChange={(value: SelectProps['options']) => setSelectedTags(value)}
              maxLength={4}
              maxCount={4}
            />
          </div>
          <RedButtonUI onClick={handleSubmit}>Send</RedButtonUI>
        </div>
      </form>
    </Modal>
  )
}
