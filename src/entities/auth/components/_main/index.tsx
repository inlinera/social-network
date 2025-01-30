import { useState } from 'react'
import s from './index.module.scss'
// COMPONENTS
import { AuthLoginEntity } from '../sign-in'
import { AuthRegEntity } from '../sign-up'
// IMAGES
import { CommonRouteBlock } from './common/routes'
// ICONS
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { observer } from 'mobx-react-lite'

interface AuthEntityProps {
  isReg: boolean
  setIsReg: (_: boolean) => void
}

export const AuthEntity = observer(({ isReg, setIsReg }: AuthEntityProps) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className={`${s.authEntity} flex`}>
      <div className={`${s.imgBlock} flex fdc jcc aic ${isActive ? s.active : ''}`}>
        <div className="flex fdc jcc aic tac">
          {isActive && (
            <div>
              <h4>Войти иначе</h4>
            </div>
          )}
        </div>
        <button className="flex jcc aic" onClick={() => setIsActive(!isActive)}>
          {isActive ? <ArrowLeft /> : <ArrowRight />}
        </button>
      </div>
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
