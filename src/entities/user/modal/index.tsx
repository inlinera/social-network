import { FC, useState } from 'react'
//COMPONENTS
import { Modal, Select } from 'antd'
import { UserFriendList } from '../lists/friend'
import { UserIncFrList } from '../lists/incoming-req'
import { UserOutFrList } from '../lists/outgoing-req'
//INTERFACES
import { IUser } from '@/shared/interfaces/IUser'
//DATA
import { friendsModal } from '@/shared/data/friends-modal-tab'

interface UserModalProps {
    userInfo?: IUser
    user: IUser
    isOpened: boolean
    setIsOpened: (state: boolean) => void
}

export const UserModal: FC<UserModalProps> = ({
     userInfo, user, isOpened, setIsOpened }) => {

    const [ friendOption, setFriendOption ] = useState<string>('Friends')

  return (
    <Modal title={`${userInfo?.displayName}'s Friends`} open={isOpened} 
      onCancel={() => setIsOpened(false)} footer={null}>
        {userInfo?.displayName == user?.displayName
        ? 
        <div>
          <Select
          value={friendOption}
          onChange={value => setFriendOption(value)}
          options={friendsModal}
          />
          <div style={{marginTop: '15px'}}>
          {
            friendOption == 'Friends' &&
            <UserFriendList userInfo={userInfo}/>
          }
          {
            friendOption == 'Incoming Requests' &&
            <UserIncFrList userInfo={userInfo}/>
          }
          {
            friendOption == 'Outgoing Requests' &&
            <UserOutFrList userInfo={userInfo}/>
          }
          </div>
        </div>
        :
          <UserFriendList userInfo={userInfo}/>
        }
      </Modal>
  )
}