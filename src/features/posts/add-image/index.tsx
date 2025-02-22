import s from './index.module.scss'
import storageApi from '@/shared/store/api/storage/storage-api'
import { ImagePlus } from 'lucide-react'

interface AddPostImageFeatureProps {
  imgList: string[]
  setImgList: (_: string[]) => void
}

export const AddPostImageFeature = ({ imgList, setImgList }: AddPostImageFeatureProps) => {
  const { uploadImage } = storageApi

  const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const url = await uploadImage(files?.[files.length - 1]!, 'photos')
    if (!url) return alert('cannot upload img')
    setImgList([...imgList, url])
  }

  return (
    <div>
      <input type="file" id="file" accept="image/*" hidden onChange={handleUpdate} multiple />
      <label htmlFor="file" className={`${s['add-post-img']} flex jcc aic`} title="Add Image">
        <ImagePlus />
      </label>
    </div>
  )
}
