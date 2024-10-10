import { storage } from "@/app/_providers/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { makeAutoObservable } from "mobx"
import { v4 } from 'uuid'

class StorageApi {
  
    constructor() {
        makeAutoObservable(this)
    }

    // ============ STORAGE ============

    //ALL STORAGE STATES
    image = null as null | string | File

    //ALL STORAGE ACTIONS
    uploadAvatar = async (file: File) => {
      const imgRef = ref(storage, `files/avatars/${v4()}`)
      try {
        await uploadBytes(imgRef, file)
        const downloadURL: string = await getDownloadURL(imgRef)
        this.setImage(downloadURL)
        return this.image || downloadURL
      } catch (e) {
        alert(e)
      }
    }

    //ALL STORAGE STATES MOVES
    setImage = (img: string) => this.image = img
}

export default new StorageApi()