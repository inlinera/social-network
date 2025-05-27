import { error } from '@/shared/data/toastify'
import storageApi from '@/shared/store/api/storage/storage-api'

export const useUploadImg = async (file: File): Promise<string | null> => {
  const { uploadImage } = storageApi

  const url = await uploadImage(file, 'photos')

  if (!url) {
    error('Невозможно загрузить изображение')
    return null
  }

  return url
}

export const useDeleteImage = async (url: string) => {
  const { deleteImage } = storageApi

  await deleteImage(`${url}`)
}

export const useChangeImage = async <E extends React.ChangeEvent<HTMLInputElement>>(
  e: E,
  setImage: (url: string) => void,
  currentImage?: string | null
) => {
  const { deleteImage } = storageApi

  const image = e.target.files?.[0]
  if (!image) return

  const url = (await useUploadImg(image)) as string

  if (currentImage) await deleteImage(`${currentImage}`)
  setImage(url)
  return url
}
