import s from './index.module.scss'
//COMPONENTS
import { List } from 'antd'
//DATA
import { sidebarInfo } from '@/shared/data/sidebar'
import { Link } from 'react-router-dom'

export const LayoutSidebar = () => {
  return (
    <nav className={s.sidebar}>
      <div className={`${s.sidebar__content} cw`}>
      <List
          itemLayout="horizontal"
          dataSource={sidebarInfo}
          renderItem={(item) => (
            <List.Item className={'cw'}>
              <List.Item.Meta
                avatar={<item.icon/>}
                title={<Link to={item.path}>{item.title}</Link>}/>
            </List.Item>
          )}
        />
      </div>
    </nav>
  )
}
