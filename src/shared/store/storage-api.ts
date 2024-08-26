import { storage } from "@/app/_providers/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { makeAutoObservable } from "mobx";


class StorageApi {
    constructor() {
        makeAutoObservable(this)
    }

    //ALL STORAGE STATES
    image = ''

    //ALL STORAGE ACTIONS
    uploadFile = async (file: File) => {
        const storageRef = ref(storage, `files/${file.name}`) // Create a storage reference
      
        try {
          const uploadTask = await uploadBytes(storageRef, file) // Upload the file
      
          const downloadURL = await getDownloadURL(uploadTask.ref) // Get the download URL
      
          console.log("File uploaded successfully:", downloadURL)
        } catch (error) {
          console.error("Error uploading file:", error)
        }
      }
}

export default new StorageApi()