import s from './index.module.scss'
//COMPONENTS
import { Layout } from 'antd'
import { HeaderUi } from './ui/header'
import { SidebarUI } from './ui/sidebar'
//HOOKS
import { useMobile } from '@/shared/hooks/useMobile'

export const LayoutNav = () => {
  const isMobile = useMobile()

  return (
    <Layout className={s.layout}>
      {!isMobile && <HeaderUi />}
      <Layout>
        <SidebarUI />
      </Layout>
    </Layout>
  )
}
