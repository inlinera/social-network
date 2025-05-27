import s from './index.module.scss'

import { ChatInputUI } from '../../ui/input'
import { ImageUI } from '@/shared/ui/image'

import InputState from '@/shared/store/functional/chat/input/input-state'
import storageApi from '@/shared/store/api/storage/storage-api'

import { CircleX } from 'lucide-react'

interface ChatAddMediaBlockProps {
  image: string | null
  setImage: (_: string | null) => void
  chattingUser?: string
}

export const ChatAddMediaBlock = ({ image, setImage, chattingUser }: ChatAddMediaBlockProps) => {
  const { deleteImage } = storageApi
  const { $null } = InputState

  const handleClose = () => {
    deleteImage(`${image}`)
    setImage(null)
    $null()
  }

  return (
    <div className={`${s.addMediaBlock} flex jcc aic`} onClick={handleClose}>
      <div className={`${s.addMediaBlock__content} flex fdc`} onClick={e => e.stopPropagation()}>
        <button className={s.addMediaBlock_close} onClick={handleClose}>
          <CircleX size={30} />
        </button>
        <div className={`${s.image} flex jcc aic`}>
          <ImageUI src={`${image}`} alt="" borderRadius={12} />
        </div>
        <ChatInputUI isAttachmentView={false} image={image} setImage={setImage} chattingUser={chattingUser} />
      </div>
    </div>
  )
}
