import { makeAutoObservable } from 'mobx'
import FontSizeState from './settings/visual/font-size'
import ThemeState from './settings/visual/theme'

export interface ISettings {
  theme: boolean
  fz: number
}

class Settings {
  constructor() {
    makeAutoObservable(this)
  }

  _ = localStorage.getItem('2la-settings') as string | null

  // =================== START APP FUNCTIONS ===================
  start = (_ = this._) => {
    console.log(_)
    try {
      if (_) return this?.$change(JSON.parse(_))
      else {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const defaultSettings: ISettings = {
          theme: isDark,
          fz: 14,
        }
        this?.$change(defaultSettings)
        localStorage.setItem('2la-settings', JSON.stringify(defaultSettings))
        console.log(localStorage.getItem('2la-settings'))
      }
    } catch (e) {
      console.error(e)
    }
  }

  $change = (_: ISettings) => {
    ThemeState.setDark(_.theme)
    FontSizeState.setFz(_.fz)
  }
}

export default new Settings()
