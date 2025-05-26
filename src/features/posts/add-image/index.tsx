import { useUploadImg } from '@/shared/hooks/details/useUploadImg'
import s from './index.module.scss'
import { ImagePlus } from 'lucide-react'
import { observer } from 'mobx-react-lite'

interface AddPostImageFeatureProps {
  imgList: string[]
  setImgList: (urls: string[]) => void
  setIsLoading: (_: boolean) => void
}

export const AddPostImageFeature = observer(({ imgList, setImgList, setIsLoading }: AddPostImageFeatureProps) => {
  const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)
    const files = e.target.files
    if (!files) return

    const uploadPromises = Array.from(files).map(file => useUploadImg(file))
    const uploadedUrls = await Promise.all(uploadPromises)
    const validUrls = uploadedUrls.filter(url => url !== null)

    setImgList([...imgList, ...validUrls])
    setIsLoading(false)
  }

  return (
    <div>
      <input type="file" id="file" accept=".png,.jpg,.jpeg,.gif" hidden onChange={handleUpdate} multiple />
      <label htmlFor="file" className={`${s['add-post-img']} flex jcc aic`} title="Add Image">
        <ImagePlus />
      </label>
    </div>
  )
})
