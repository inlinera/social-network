import authApi from '@/shared/store/api/user/auth/auth-api'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { ChangePassComponent } from './components/change-pass'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
const path = 'settings.safety.'

export const safety = () => {
  const { logout, deleteAccount } = authApi
  const { t } = useTranslation()
  const navigate = useNavigate()

  const deleteUser = useCallback(() => {
    deleteAccount()
    navigate('/auth')
  }, [deleteAccount])

  return {
    name: t(`${path}_`),
    content: [
      {
        name: t(`${path}pass._`),
        content: <ChangePassComponent />,
      },
      {
        name: t(`${path}exit._`),
        content: <RedButtonUI onClick={() => logout()}>{t(`${path}exit.btn`)}</RedButtonUI>,
      },
      {
        name: t(`${path}delete._`),
        content: <RedButtonUI onClick={deleteUser}>{t(`${path}delete.btn`)}</RedButtonUI>,
      },
    ],
    code: 0,
  }
}
