import { FC, useState } from 'react'
//COMPONENTS
import { Modal, Select } from 'antd'
import { UserFriendList } from '../../lists/friend'
//INTERFACES
import { IUser } from '@/shared/interfaces/IUser'
//DATA
import { friendsModal } from '@/shared/data/friends-modal-tab'
import authApi from '@/shared/store/auth-api'

interface UserFriendModalProps {
    userInfo?: IUser
    isOpened: boolean
    setIsOpened: (state: boolean) => void
}

export const UserFriendModal: FC<UserFriendModalProps> = ({
     userInfo, isOpened, setIsOpened }) => {

    const [ friendOption, setFriendOption ] = useState('Friends')
    const { user } = authApi

  return (
    <Modal
    title={`${userInfo?.displayName}'s Friends`}
    open={isOpened}
    onCancel={() => setIsOpened(false)}
    footer={null}
    >
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
            <UserFriendList
            array={userInfo?.friends}
            listType='friend'
            />
          }
          {
            friendOption == 'Incoming Requests' &&
            <UserFriendList
            array={userInfo?.incomingReq}
            listType='incomingRequests'
            />
          }
          {
            friendOption == 'Outgoing Requests' &&
            <UserFriendList
            array={userInfo?.outgoingReq}
            listType='outgoingRequests'
            />
          }
          </div>
        </div>
        :
          <UserFriendList
          array={userInfo?.friends!}
          listType=''
          />
        }
      </Modal>
  )
}