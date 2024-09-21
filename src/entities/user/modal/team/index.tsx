import { IUser } from "@/shared/interfaces/IUser"
import { Modal } from "antd"
import { FC } from "react"
import { UserTeamList } from "../../lists/team"

interface UserTeamModalProps {
    userInfo?: IUser
    isOpened: boolean
    setIsOpened: (state: boolean) => void
}

export const UserTeamModal: FC<UserTeamModalProps> = ({ userInfo, isOpened, setIsOpened }) => {
  return (
    <Modal title={`${userInfo?.displayName}'s Teams`} open={isOpened}
    onCancel={() => setIsOpened(false)} footer={null}>
        <UserTeamList userInfo={userInfo}/>
    </Modal>
  )
}