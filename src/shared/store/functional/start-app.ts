import { makeAutoObservable } from 'mobx'

export type ThemeT = 'dark' | 'light'
export type LangT = 'ru' | 'en'

export interface ISettings {
  theme?: ThemeT
  fz?: number
  lang?: LangT
}

const defaultSettings: ISettings = {
  theme: 'dark',
  fz: 14,
  lang: 'en',
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
