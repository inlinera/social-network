import { useState, useCallback, memo } from 'react'
import s from './index.module.scss'

import { ImageListModal } from '../modal'
import { ImageUI } from '@/shared/ui/image'
import { InView } from 'react-intersection-observer'

interface PostImageListProps {
  images: string[]
}

export const PostImageList = memo(({ images }: PostImageListProps) => {
  const [isOpened, setIsOpened] = useState(false)
  const [imgs, setImgs] = useState<string[] | undefined>()

  const handleInView = useCallback(
    (inView: boolean) => {
      if (inView && !imgs) setImgs(images)
    },
    [imgs, images]
  )

  const handleOpenModal = useCallback(() => {
    setIsOpened(true)
  }, [])

  return (
    <>
      <ImageListModal images={images} isOpened={isOpened} setIsOpened={setIsOpened} />
      <InView
        as="div"
        onChange={handleInView}
        className={`${
          images.length === 1 ? s.oneElement : images.length === 2 ? s.twoElement : s.threeElement
        } grid`}
      >
        {!imgs
          ? Array.from({ length: images.length }, (_, id) => <div className={s.wrapper} key={id} />)
          : imgs?.slice(0, 2).map(i => (
              <div className={s.imageWrapper} key={i}>
                <ImageUI src={i} alt={i} className={s.image} borderRadius={10} loading="lazy" />
              </div>
            ))}
        {images.length > 2 && (
          <button className={s.more} onClick={handleOpenModal}>
            +{images.length - 2}
          </button>
        )}
      </InView>
    </>
  )
})
