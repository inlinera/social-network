import { useNav } from '@/shared/hooks/useNav'
import s from './index.module.scss'
import src from '@/app/assets/logo/logo.png'

export const HeaderUi = () => {
  const navigate = useNav('/')
  return (
    <header className={`${s.header} flex`}>
      <div className="flex aic">
        <img src={src} height={150} onClick={navigate} draggable={false} />
        <input className={s.header__input} type="text" placeholder="Find your friend" />
      </div>
      <div>v</div>
    </header>
  )
}
