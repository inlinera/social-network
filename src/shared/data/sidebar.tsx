import { HomeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { token } from '../token/token'

export const sidebarInfo = [
  {
    title: 'Profile',
    icon: <UserOutlined />,
    path: `user/${token}`,
  },
  {
    title: 'Home',
    icon: <HomeOutlined />,
    path: '/',
  },
  {
    title: 'Chats',
    icon: <MessageOutlined />,
    path: '/chats',
  },
]
