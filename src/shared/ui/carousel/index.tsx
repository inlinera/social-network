import s from './index.module.scss'
import { ImageUI } from '../image'

interface CarouselUIProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[]
  height: string | number
  borderRadius?: string | number
}

export const CarouselUI = ({ borderRadius, images, height, ...props }: CarouselUIProps) => {
  return (
    <div className={`${s['carousel-ui']} flex`} {...props} style={{ height: height }}>
      {images.map(img => {
        if (!img) return
        return (
          <ImageUI
            key={img}
            src={img}
            alt=""
            borderRadius={borderRadius}
            className={`${s['carousel-image']}`}
            draggable={false}
          />
        )
      })}
    </div>
  )
}
