import { makeAutoObservable } from 'mobx'

export interface ISettings {
  theme?: boolean
  fz?: number
}

class Settings {
  constructor() {
    makeAutoObservable(this)
    this.start()
  }

  settings: ISettings | null = JSON.parse(`${localStorage.getItem('2la-settings')}`)

  // =================== START APP FUNCTIONS ===================
  start = (settings = this.settings) => {
    try {
      if (settings) return this?.$change(settings)
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const defaultSettings: ISettings = {
        theme: isDark,
        fz: 14,
      }
      this?.$change(defaultSettings)
      localStorage.setItem('2la-settings', JSON.stringify(defaultSettings))
    } catch (e) {
      console.error(e)
    }
  }

  $change = (newSettings: ISettings) => {
    localStorage.setItem('2la-settings', JSON.stringify(newSettings))
    document.body.style.fontSize = `${newSettings.fz}px`
    document.body.setAttribute('data-theme', `${newSettings.theme}`)
  }
}

export default new Settings()
