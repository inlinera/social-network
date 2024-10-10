import { AntdImageComponent } from '@/shared/ui/image'
import { Modal } from 'antd'
import { FC } from 'react'

interface ImageListModalProps {
  images: string[]
  isOpened: boolean
  setIsOpened: (state: boolean) => void
}

export const ImageListModal: FC<ImageListModalProps> = ({ images, isOpened, setIsOpened }) => {
  const handleClose = () => setIsOpened(false)

  return (
    <Modal open={isOpened} onOk={handleClose} onCancel={handleClose} footer={null}>
      <div>
        {images.map(i => (
          <AntdImageComponent src={i} key={i} />
        ))}
      </div>
    </Modal>
  )
}
