import { useState } from 'react'

import authApi from '@/shared/store/api/user/auth/auth-api'
import { InputUi } from '@/shared/ui/input'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'

export const safety = () => {
  const { changePassword } = authApi
  const [pass, setPass] = useState('')
  const [currPass, setCurrPass] = useState('')

  return {
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
        content: <RedButtonUI onClick={() => console.log('@duckowa')}>Exit</RedButtonUI>,
      },
      {
        name: 'Удалить аккаунт',
        content: <RedButtonUI onClick={() => console.log('@duckowa')}>Delete</RedButtonUI>,
      },
    ],
    code: 0,
  }
}
