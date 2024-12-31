import { makeAutoObservable } from 'mobx'
import Settings, { ISettings } from '../../start-app'

class FontSizeState {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== FONT SIZE STATE ===================
  fz = 14
  setFz = (_: number) => {
    this.fz = _
    localStorage.setItem(
      '2la-settings',
      JSON.stringify({ ...JSON.parse(Settings._!), fz: this.fz } as ISettings)
    )
  }
}

export default new FontSizeState()
