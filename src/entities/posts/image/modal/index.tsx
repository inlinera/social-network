import { AntdImageComponent } from '@/shared/ui/image'
import { Modal } from 'antd'
import s from './index.module.scss'

interface ImageListModalProps {
  images: string[]
  isOpened: boolean
  setIsOpened: (state: boolean) => void
}

export const ImageListModal = ({ images, isOpened, setIsOpened }: ImageListModalProps) => {
  const handleClose = () => setIsOpened(false)

  return (
    <Modal open={isOpened} onOk={handleClose} onCancel={handleClose} footer={null}>
      <div className={`${s.image_list} grid`}>
        {images.map(i => (
          <AntdImageComponent src={i} key={i} />
        ))}
      </div>
    </Modal>
  )
}
