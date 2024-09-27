import { HomeOutlined, MessageOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";

const getUser = localStorage.getItem('token-wunderkids')

export const sidebarInfo = [
    {
        title: 'Profile',
        icon: UserOutlined,
        path: `user/${getUser}`
      },
      {
        title: 'Home',
        icon: HomeOutlined,
        path: '/'
      },
      {
        title: 'Chats',
        icon: MessageOutlined,
        path: '/chats'
      },
      {
        title: 'Teams',
        icon: TeamOutlined,
        path: '/teams'
      },
]