import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import s from './index.module.scss'
//COMPONENTS
import { Layout, Menu } from 'antd'
import { Footer, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
//DATA
import { sidebarInfo } from '@/shared/data/sidebar'
//MOBX
import checkWidthStore from '@/shared/store/utils/check-width'

export const LayoutNav = observer(() => {

  const { isMobile } = checkWidthStore

  return (
    <Layout>

      <Header className={s.header}>
      <Menu
          theme="dark"
          mode="horizontal"
          items={['1', 'yoyoyoy'] as any}
        />
      </Header>
      <Layout>
        {!isMobile 
        ?
          <Sider className={s.sider} style={{
            position: 'fixed',
            background: 'transparent'
          }}>
            <Menu
              style={{
                margin: '15px 3px',
                padding: '5px',
                borderRadius: '6px'
              }}
              mode="inline"
              theme="dark"
              items={sidebarInfo.map((item) => ({
                key: item.path,
                icon: <item.icon />,
                label: <Link to={item.path}>{item.title}</Link>,
              }))}
            />
          </Sider>
        :
        <Footer className={s.footer}>
          <Menu
              className={s.footer__menu}
              mode="horizontal"
              theme="dark"
              items={sidebarInfo.map(item => ({
                key: item.path,
                icon: <item.icon style={{fontSize: '20px', margin: 'auto'}}/>,
                label: <Link to={item.path}>{item.title}</Link>,
              }))}
            />
        </Footer>
        }
        </Layout>

    </Layout>
  )
})