import { useState, useCallback, memo } from 'react'
import s from './index.module.scss'

import { ImageListModal } from '../modal'
import { ImageUI } from '@/shared/ui/image'

interface PostImageListProps {
  images: string[]
}

export const PostImageList = memo(({ images }: PostImageListProps) => {
  const [isOpened, setIsOpened] = useState(false)

  const handleOpenModal = useCallback(() => {
    setIsOpened(true)
  }, [])

  return (
    <>
      <ImageListModal images={images} isOpened={isOpened} setIsOpened={setIsOpened} />
      <div
        className={`${
          images.length === 1 ? s.oneElement : images.length === 2 ? s.twoElement : s.threeElement
        } grid`}
      >
        {images?.slice(0, 2).map(i => (
          <div className={s.imageWrapper} key={i}>
            <ImageUI src={i} alt={i} className={s.image} borderRadius={10} loading="lazy" />
          </div>
        ))}
        {images.length > 2 && (
          <button className={s.more} onClick={handleOpenModal}>
            +{images.length - 2}
          </button>
        )}
      </div>
    </>
  )
})
