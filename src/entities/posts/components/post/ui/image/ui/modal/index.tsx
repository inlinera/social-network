import s from './index.module.scss'

import { Image, Modal } from 'antd'

interface ImageListModalProps {
  images: string[]
  isOpened: boolean
  setIsOpened: (state: boolean) => void
}

export const ImageListModal = ({ images, isOpened, setIsOpened }: ImageListModalProps) => {
  const handleClose = () => setIsOpened(false)

  return (
    <Modal open={isOpened} onOk={handleClose} onCancel={handleClose} footer={null} closeIcon={null}>
      <div className={`${s.image_list} grid`}>
        {images.map(i => (
          <Image className={s.image} src={i} key={i} />
        ))}
      </div>
    </Modal>
  )
}
