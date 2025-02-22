import s from './index.module.scss'
// COMPONENTS
import { AuthLoginEntity } from '../sign-in'
import { AuthRegEntity } from '../sign-up'
// IMAGES
import { CommonRouteBlock } from './common/routes'
import { observer } from 'mobx-react-lite'

interface AuthEntityProps {
  isReg: boolean
  setIsReg: (_: boolean) => void
}

export const AuthEntity = observer(({ isReg, setIsReg }: AuthEntityProps) => {
  return (
    <div className={`${s.authEntity} flex`}>
      <div className={`${s.authEntity__content} flex fdc aic`}>
        <h1>{isReg ? 'Регистрация' : 'Вход'}</h1>
        {isReg ? <AuthRegEntity /> : <AuthLoginEntity />}
        <CommonRouteBlock>
          {isReg ? (
            <>
              Уже есть аккаунт? <button onClick={() => setIsReg(false)}>Войти</button>
            </>
          ) : (
            <>
              Ещё нет аккаунта? <button onClick={() => setIsReg(true)}>Создать</button>
            </>
          )}
        </CommonRouteBlock>
      </div>
    </div>
  )
})
