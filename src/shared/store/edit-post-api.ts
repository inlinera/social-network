import { makeAutoObservable } from 'mobx'

class EditPostApi {
  constructor() {
    makeAutoObservable(this)
  }

  submitChanges = (value: string, setIsEditing: (state: boolean) => void) => {
    try {
      console.log(value)
      setIsEditing(false)
    } catch (e) {
      alert(e)
    }
  }
}

export default new EditPostApi()
