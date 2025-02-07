import { useState } from 'react'
import s from './settings.module.scss'
//MOBX
import FontSizeState from '@/shared/store/functional/settings/visual/font-size'
import ThemeState from '@/shared/store/functional/settings/visual/theme'
//HOOKS
import { useFontSize } from '@/shared/hooks/settings/useFontSize'
import { InputUi } from '@/shared/ui/input'
// MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import EditPrivacySettings from '@/shared/store/api/user/profile/details/change-privacy-api'

export interface ISetting {
  name: string
  content?: IContent[]
  code: number
}

export interface IContent {
  name: string
  value?: string | number | React.ReactNode
  info?: React.ReactNode
  content?: React.ReactNode
}

export const items = (): ISetting[] => {
  const { fz, setFz } = FontSizeState
  const { dark, setDark } = ThemeState
  const { user, changePassword } = authApi
  const { editField } = EditPrivacySettings
  const [isNameVisible, setIsNameVisible] = useState(user?.isNameVisible)
  const [isBirthdayVisible, setIsBirthdayVisible] = useState(user?.isBirthdayVisible)
  const [areFriendsVisible, setAreFriendsVisible] = useState(user?.areFriendsVisible)
  const [pass, setPass] = useState('')
  const [currPass, setCurrPass] = useState('')

  console.log(isNameVisible, isBirthdayVisible, areFriendsVisible)

  const isVisible = (_: boolean) => (_ ? 'Видно' : 'Скрыто')
  return [
    {
      name: 'Безопасность',
      content: [
        {
          name: 'Сменить пароль',
          content: (
            <div className="flex fdc">
              <InputUi
                value={currPass}
                setVal={setCurrPass}
                minLength={6}
                maxLength={25}
                placeholder="Enter current password..."
              />
              <div className="flex jcc aic">
                <InputUi
                  value={pass}
                  setVal={setPass}
                  minLength={6}
                  maxLength={25}
                  placeholder="Enter new password..."
                />
                <button
                  className={s.themeButton}
                  onClick={() =>
                    changePassword(pass, currPass).then(() => {
                      setPass('')
                      setCurrPass('')
                    })
                  }
                >
                  Change
                </button>
              </div>
            </div>
          ),
        },
        {
          name: 'Выйти из аккаунта',
          content: (
            <button className={s.themeButton} onClick={() => console.log('@duckowa')}>
              Exit
            </button>
          ),
        },
        {
          name: 'Удалить аккаунт',
          content: (
            <button className={s.themeButton} onClick={() => console.log('@duckowa')}>
              Delete
            </button>
          ),
        },
      ],
      code: 0,
    },
    {
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
          content: (
            <button className={s.themeButton} onClick={() => setDark(!dark)}>
              Change theme
            </button>
          ),
        },
      ],
      code: 1,
    },
    {
      name: 'Конфиденциальность',
      content: [
        {
          name: 'Тип аккаунта',
          value: 'Открытый',
          content: (
            <button className={s.themeButton} onClick={() => console.log('@duckowa')}>
              Change
            </button>
          ),
        },
        {
          name: 'Видимость имени',
          value: isVisible(Boolean(isNameVisible)),
          content: (
            <button
              className={s.themeButton}
              onClick={() => {
                editField(Boolean(!isNameVisible), `isNameVisible`)
                setIsNameVisible(!isNameVisible)
              }}
            >
              Change
            </button>
          ),
        },
        {
          name: 'Видимость дня рождения',
          value: isVisible(Boolean(isBirthdayVisible)),
          content: (
            <button
              className={s.themeButton}
              onClick={() => {
                editField(Boolean(!isBirthdayVisible), `isBirthdayVisible`)
                setIsBirthdayVisible(!isBirthdayVisible)
              }}
            >
              Change
            </button>
          ),
        },
        {
          name: 'Видимость друзей',
          value: isVisible(Boolean(areFriendsVisible)),
          content: (
            <button
              className={s.themeButton}
              onClick={() => {
                try {
                  editField(Boolean(!areFriendsVisible), `areFriendsVisible`)
                  setAreFriendsVisible(!areFriendsVisible)
                } catch {
                  alert('Error, pls try again later')
                }
              }}
            >
              Change
            </button>
          ),
        },
      ],
      code: 2,
    },
  ]
}
