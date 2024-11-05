import { db } from '@/app/_providers/firebase'
import { deleteDoc, doc } from 'firebase/firestore'
import { makeAutoObservable } from 'mobx'

class DeletePostApi {
  constructor() {
    makeAutoObservable(this)
  }

  // DELETE POST API STATES
  loading? = false

  // DELETE POST ACTION
  deletePost = async (id: string) => {
    this.setLoading(true)
    try {
      await deleteDoc(doc(db, 'posts', id))
    } catch (e) {
      alert(e)
    } finally {
      this.setLoading(false)
    }
  }

  // DELETE POST STATE MOVES
  setLoading = (state: boolean) => (this.loading = state)
}

export default new DeletePostApi()
