import { action, makeAutoObservable } from 'mobx'
import Settings, { ISettings } from '../../start-app'

class FontSizeState {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== FONT SIZE STATE ===================
  fz = 14
  setFz = action((_: number) => {
    this.fz = _
    this.$()
  })
  $ = () => {
    localStorage.setItem(
      '2la-settings',
      JSON.stringify({ ...JSON.parse(Settings._!), fz: this.fz } as ISettings)
    )
    document.body.style.fontSize = `${this.fz}px`
  }
}

export default new FontSizeState()
