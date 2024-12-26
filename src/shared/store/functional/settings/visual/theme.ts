import { makeAutoObservable } from 'mobx'

class ThemeState {
  constructor() {
    makeAutoObservable(this)
  }

  // =================== THEME STATE ===================
  dark = true
  setDark = (_: boolean) => {
    this.dark = _
    this.$()
  }
  $ = () => document.body.setAttribute('data-theme', `${this.dark}`)
}

export default new ThemeState()
