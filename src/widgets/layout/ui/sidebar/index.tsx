import { useLocation } from 'react-router-dom'
import s from './index.module.scss'
//DATA
import { sidebarInfo } from '@/shared/data/sidebar'
//HOOKS
import { useNav } from '@/shared/hooks/useNav'

import { observer } from 'mobx-react-lite'
import authApi from '@/shared/store/api/user/auth/auth-api'

export const SidebarUI = observer(() => {
  const currentLocation = useLocation()
  const { user } = authApi
  const isUserLoc = currentLocation.pathname == `/user/${user?.displayName}`
  const selectedItems = [isUserLoc ? sidebarInfo()[0].path : currentLocation.pathname]

  return (
    <nav className={`${s.sider} flex`}>
      <div className={`${s.sider_sidebar} flex fdc jcc`}>
        {sidebarInfo().map(e => {
          const isExists = selectedItems[0] == e.path
          const navigate = useNav(e.path)
          return (
            <button
              className={`${s.sider_sidebar__button} flex aic ${isExists && s.toggle}`}
              onClick={() => navigate()}
              key={e.path}
            >
              {e.icon}
              {e.title}
            </button>
          )
        })}
      </div>
    </nav>
  )
})
