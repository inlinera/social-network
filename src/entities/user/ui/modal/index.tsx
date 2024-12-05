import { useState } from 'react'
//COMPONENTS
import { Modal, Select } from 'antd'
import { UserFriendList } from '../lists'
//INTERFACES
import { IUser } from '@/shared/interfaces/IUser'
import { IFriend } from '@/shared/interfaces/IFriend'
//DATA
import { friendsModal } from '@/shared/data/friends-modal-tab'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'

interface UserFriendModalProps {
  userInfo?: IUser
  isOpened: boolean
  setIsOpened: (state: boolean) => void
}

export const UserFriendModal = ({ userInfo, isOpened, setIsOpened }: UserFriendModalProps) => {
  const [friendOption, setFriendOption] = useState('Friends')
  const { user } = authApi

  return (
    <Modal
      title={`${userInfo?.displayName}'s Friends`}
      open={isOpened}
      onCancel={() => setIsOpened(false)}
      footer={null}
    >
      {userInfo?.displayName == user?.displayName ? (
        <div>
          <Select
            value={friendOption}
            onChange={value => setFriendOption(value)}
            options={friendsModal}
          />
          <div style={{ marginTop: '15px' }}>
            {friendOption == 'Friends' && (
              <UserFriendList array={userInfo?.friends} listType="friend" />
            )}
            {friendOption == 'Incoming Requests' && (
              <UserFriendList array={userInfo?.incomingReq} listType="incomingRequests" />
            )}
            {friendOption == 'Outgoing Requests' && (
              <UserFriendList array={userInfo?.outgoingReq} listType="outgoingRequests" />
            )}
          </div>
        </div>
      ) : (
        <UserFriendList array={userInfo?.friends as IFriend[]} listType="" />
      )}
    </Modal>
  )
}
