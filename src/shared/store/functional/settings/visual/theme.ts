import { makeAutoObservable } from 'mobx'
import Settings, { ISettings } from '../../start-app'

class ThemeState {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== THEME STATE ===================
  dark = true
  setDark = (_: boolean) => {
    this.dark = _
    localStorage.setItem(
      '2la-settings',
      JSON.stringify({ ...JSON.parse(Settings._!), theme: this.dark } as ISettings)
    )
    this.$()
  }
  $ = () => document.body.setAttribute('data-theme', `${this.dark}`)
}

export default new ThemeState()
