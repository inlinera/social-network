import { ImageUI } from '../image'
import { ModalUi } from '../modal'
import s from './index.module.scss'

interface ImageModalProps {
  img: string
  setIsOpened: (_: boolean) => void
}

export const ImageModal = ({ img, setIsOpened }: ImageModalProps) => {
  return (
    <ModalUi setIsOpened={setIsOpened} padding={0}>
      <div className={`${s.image} flex jcc aic`}>
        <ImageUI src={img} alt="" borderRadius={16} width={'100%'} height={'100%'} />
      </div>
    </ModalUi>
  )
}
