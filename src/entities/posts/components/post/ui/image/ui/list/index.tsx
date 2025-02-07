import { useState } from 'react'
import s from './index.module.scss'
import { ImageListModal } from '../modal'

interface PostImageListProps {
  images: string[]
}

export const PostImageList = ({ images }: PostImageListProps) => {
  const [isOpened, setIsOpened] = useState(false)
  return (
    <>
      <ImageListModal images={images} isOpened={isOpened} setIsOpened={setIsOpened} />
      <div
        className={`${
          images.length == 1
            ? s.oneElement
            : images.length == 2
            ? s.twoElement
            : s.threeElement
        } grid`}
      >
        {images.slice(0, 2).map(i => (
          <div className={s.imageWrapper} key={i}>
            <img src={i} alt={i} className={s.image} />
          </div>
        ))}
        {images.length > 2 && (
          <button className={s.more} onClick={() => setIsOpened(true)}>
            +{images.length - 2}
          </button>
        )}
      </div>
    </>
  )
}
