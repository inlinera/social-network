import { sidebarInfo } from '@/shared/data/sidebar'
import { Layout, Menu } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { Link } from 'react-router-dom'

export const LayoutNav = () => {

  const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    paddingTop: '60px',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarColor: 'unset',
    background: 'transparent'
  }

  return (
    <Layout>
    
      <Header style={{ display: 'flex', alignItems: 'center', height: '50px' }}>
      <Menu
          theme="dark"
          mode="horizontal"
        />
      </Header>

      <Layout>
        <Sider style={siderStyle}>
        <Menu
        style={{width: 'inherit', margin: '3px', padding: '5px', borderRadius: '6px'}}
          mode="inline"
          theme="dark"
          items={sidebarInfo.map(item => ({
            key: item.path,
            icon: <item.icon />,
            label: <Link to={item.path}>{item.title}</Link>
          }))}
        />
        </Sider>
        </Layout>
    </Layout>
  )
}
