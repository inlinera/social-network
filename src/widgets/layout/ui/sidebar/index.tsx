import { useLocation } from 'react-router-dom'
import s from './index.module.scss'
//DATA
import { token } from '@/shared/token/token'
import { sidebarInfo } from '@/shared/data/sidebar'
//HOOKS
import { useNav } from '@/shared/hooks/useNav'

export const SidebarUI = () => {
  const currentLocation = useLocation()
  const isUserLoc = currentLocation.pathname == `/user/${token}`
  const selectedItems = [isUserLoc ? sidebarInfo[0].path : currentLocation.pathname]
  console.log(selectedItems)

  return (
    <div>
      <div className={`${s.sider} flex cw`}>
        <div className={`${s.sider_sidebar} flex fdc jcc`}>
          {sidebarInfo.map(e => {
            const isExists = selectedItems[0] == e.path
            const navigate = useNav(e.path)
            return (
              <button
                className={`${s.sider_sidebar__button} flex aic ${isExists && s.toggle}`}
                onClick={() => navigate()}
              >
                {e.icon}
                {e.title}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
