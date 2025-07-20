import { useNav } from '@/shared/hooks/useNav'
import s from './index.module.scss'
import src from '@/app/assets/logo/logo.png'

export const HeaderUi = () => {
  const navigate = useNav('/')

  return (
    <>
      <div className={s.blackBlock} />
      <header className={`${s.header} flex`}>
        <button onClick={navigate}>
          <img src={src} draggable={false} />
        </button>
      </header>
    </>
  )
}
