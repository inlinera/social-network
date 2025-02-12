import s from './index.module.scss'
import { ImageUI } from '../image'
import { Eye, Trash } from 'lucide-react'
import storageApi from '@/shared/store/api/storage/storage-api'

interface CarouselUIProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[]
  setImages?: (_: string[]) => void
  height: string | number
  borderRadius?: string | number
  edit?: boolean
}

export const CarouselUI = ({
  borderRadius,
  images,
  setImages,
  height,
  edit,
  ...props
}: CarouselUIProps) => {
  const { deleteImage } = storageApi
  return (
    <div className={`${s['carousel-ui']} flex`} {...props} style={{ height }}>
      {images.map(img => {
        return (
          <div className={`${s['carousel-ui-image']} flex`}>
            {edit && (
              <div className="flex">
                <button className="flex jcc aic" type="button">
                  <a href={img} target="_blank" className="flex jcc aic">
                    <Eye />
                  </a>
                </button>
                <button
                  className="flex jcc aic"
                  type="button"
                  onClick={() =>
                    deleteImage(img).then(() => setImages?.(images.filter(url => url != img)))
                  }
                >
                  <Trash />
                </button>
              </div>
            )}
            <ImageUI
              key={img}
              src={img}
              alt=""
              borderRadius={borderRadius}
              draggable={false}
            />
          </div>
        )
      })}
    </div>
  )
}
