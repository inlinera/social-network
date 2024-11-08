import s from './index.module.scss'
//COMPONENTS
import { HeaderUi } from './ui/header'
import { SidebarUI } from './ui/sidebar'
//HOOKS
import { useMobile } from '@/shared/hooks/useMobile'

export const LayoutNav = () => {
  const isMobile = useMobile()

  return (
    <div className={s.layout}>
      {!isMobile && <HeaderUi />}
      <SidebarUI />
    </div>
  )
}
