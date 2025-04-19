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
