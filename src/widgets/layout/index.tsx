import { observer } from 'mobx-react-lite'
//COMPONENTS
import { HeaderUi } from './ui/header'
import { SidebarUI } from './ui/sidebar'
//HOOKS
import { useMobile } from '@/shared/hooks/useMobile'

export const LayoutNav = observer(() => {
  const isMobile = useMobile()

  return (
    <>
      {!isMobile && <HeaderUi />}
      <SidebarUI />
    </>
  )
})
