import s from './view.module.scss'

import FontSizeState from '@/shared/store/functional/settings/visual/font-size'
import ThemeState from '@/shared/store/functional/settings/visual/theme'

import { useFontSize } from '@/shared/hooks/settings/useFontSize'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'

export const view = () => {
  const { fz, setFz } = FontSizeState
  const { dark, setDark } = ThemeState

  return {
    name: 'Вид',
    content: [
      {
        name: 'Размер шрифта',
        value: `${fz}px`,
        content: (
          <input
            type="range"
            min="12"
            max="17"
            className={s.rangeInput}
            value={fz}
            onChange={e => setFz(+e.target.value)}
            onTouchEnd={() => useFontSize(fz).edit()}
            onMouseUp={() => useFontSize(fz).edit()}
          />
        ),
      },
      {
        name: 'Тема',
        value: `${dark ? 'Темная' : 'Светлая'}`,
        content: <RedButtonUI onClick={() => setDark(!dark)}>Change theme</RedButtonUI>,
      },
    ],
    code: 1,
  }
}
