import { makeAutoObservable } from 'mobx'

class FontSizeState {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== FONT SIZE STATE ===================
  fz = 14
  setFz = (_: number) => (this.fz = _)
}

export default new FontSizeState()
