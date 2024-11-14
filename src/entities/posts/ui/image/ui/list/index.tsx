import { useState } from 'react'
import s from './index.module.scss'
import { ImageListModal } from '../modal'

interface PostImageListProps {
  images: string[]
}

export const PostImageList = ({ images }: PostImageListProps) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div className={`${s.image_list} grid`}>
      <ImageListModal images={images} isOpened={isOpened} setIsOpened={setIsOpened} />
      <div>
        {images.length >= 3 ? (
          <div>
            {images.slice(0, 3).map(i => (
              <img src={i} alt={i} key={i} className={s.image} />
            ))}
            <button className={s.other_images} onClick={() => setIsOpened(true)}>
              +{images.length - 3}
            </button>
          </div>
        ) : (
          images.map(i => <img src={i} alt={i} key={i} className={s.image} />)
        )}
      </div>
    </div>
  )
}
