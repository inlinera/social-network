import { FC } from "react"
import s from './index.module.scss'
//ICONS
import { TeamOutlined, UserOutlined } from "@ant-design/icons"

interface InfoBlockButtons {
    setIsOpenedFriend: (state: boolean) => void
    setIsOpenedTeam: (state: boolean) => void
}

export const InfoBlockModalButtons: FC<InfoBlockButtons> = (
    { setIsOpenedFriend, setIsOpenedTeam } ) => {

  return (
    <div className={s.userInfo_meta_btns}>
        <button onClick={() => setIsOpenedFriend(true)}>
            <UserOutlined />
            Friends
        </button>
        <button onClick={() => setIsOpenedTeam(true)}>
            <TeamOutlined />
            Teams
        </button>
    </div>
  )
}
