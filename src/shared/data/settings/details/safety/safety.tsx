import authApi from '@/shared/store/api/user/auth/auth-api'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { ChangePassComponent } from './components/change-pass'

export const safety = () => {
  const { logout, deleteAccount } = authApi

  return {
    name: 'Безопасность',
    content: [
      {
        name: 'Сменить пароль',
        content: <ChangePassComponent />,
      },
      {
        name: 'Выйти из аккаунта',
        content: <RedButtonUI onClick={() => logout()}>Exit</RedButtonUI>,
      },
      {
        name: 'Удалить аккаунт',
        content: <RedButtonUI onClick={() => deleteAccount()}>Delete</RedButtonUI>,
      },
    ],
    code: 0,
  }
}
