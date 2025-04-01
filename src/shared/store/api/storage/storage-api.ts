import { storage } from '@/app/_providers/firebase'
import { error } from '@/shared/data/toastify'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { makeAutoObservable } from 'mobx'
import { v4 } from 'uuid'

class StorageApi {
  constructor() {
    makeAutoObservable(this)
  }

  // ============ STORAGE ============

  //ALL STORAGE STATES
  image? = null as null | string | File

  //ALL STORAGE ACTIONS
  uploadImage = async (file: File, dir: string) => {
    const imgRef = ref(storage, `files/${dir}/${v4()}`)
    try {
      await uploadBytes(imgRef, file)
      const downloadURL: string = await getDownloadURL(imgRef)
      this.setImage(downloadURL)
      return downloadURL
    } catch (e) {
      error('Ошибка загрузки изображения')
    }
  }

  deleteImage = async (url: string) => {
    try {
      const storage = getStorage()
      const imgRef = ref(storage, url)
      console.log(imgRef)
      await deleteObject(imgRef)
    } catch {
      error('Ошибка удаления изображения')
    }
  }

  //ALL STORAGE STATES MOVES
  setImage = (img: string) => (this.image = img)
}

export default new StorageApi()
