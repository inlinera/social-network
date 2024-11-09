import s from './index.module.scss'
//ICONS
import { UserOutlined } from '@ant-design/icons'

interface InfoBlockButtons {
  setIsOpenedFriend: (state: boolean) => void
}

export const InfoBlockModalButtons = ({ setIsOpenedFriend }: InfoBlockButtons) => {
  return (
    <div className={s.userInfo_meta_btns}>
      <button onClick={() => setIsOpenedFriend(true)}>
        <UserOutlined />
        Friends
      </button>
    </div>
  )
}
