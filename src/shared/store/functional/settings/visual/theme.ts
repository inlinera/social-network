import { action, makeAutoObservable } from 'mobx'
import Settings, { ISettings } from '../../start-app'

class ThemeState {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== THEME STATE ===================
  dark = true
  setDark = action((_: boolean) => {
    this.dark = _
    this.$()
  })
  $ = () => {
    localStorage.setItem(
      '2la-settings',
      JSON.stringify({ ...JSON.parse(Settings._!), theme: this.dark } as ISettings)
    )
    document.body.setAttribute('data-theme', `${this.dark}`)
  }
}

export default new ThemeState()
