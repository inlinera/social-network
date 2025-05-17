import { error } from '@/shared/data/toastify'
import storageApi from '@/shared/store/api/storage/storage-api'

const { deleteImage } = storageApi

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
  await deleteImage(`${url}`)
}

export const useChangeImage = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setImage: (url: string) => void,
  currentImage?: string | null
) => {
  const image = e.target.files?.[0]
  if (!image) return

  const url = (await useUploadImg(image)) as string

  if (currentImage) await deleteImage(`${currentImage}`)
  setImage(url)
  return url
}
