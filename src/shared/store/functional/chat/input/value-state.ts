import { makeAutoObservable } from 'mobx'

class ValState {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== VALUE STATE ===================
  val = ''

  setVal = (s: string) => (this.val = s)
}

export default new ValState()
