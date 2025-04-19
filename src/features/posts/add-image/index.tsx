import { useUploadImg } from '@/shared/hooks/details/useUploadImg'
import s from './index.module.scss'
import { ImagePlus } from 'lucide-react'
import { observer } from 'mobx-react-lite'

interface AddPostImageFeatureProps {
  imgList: string[]
  setImgList: (_: string[]) => void
}

export const AddPostImageFeature = observer(({ imgList, setImgList }: AddPostImageFeatureProps) => {
  const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // eslint-disable-next-line prefer-const
    let newImages: string[] = []

    for (let i = 0; i < files.length; i++) {
      const url = await useUploadImg(files[i])
      newImages.push(url!)
    }

    setImgList([...imgList, ...newImages])
  }

  return (
    <div>
      <input type="file" id="file" accept="image/*" hidden onChange={handleUpdate} multiple />
      <label htmlFor="file" className={`${s['add-post-img']} flex jcc aic`} title="Add Image">
        <ImagePlus />
      </label>
    </div>
  )
})
