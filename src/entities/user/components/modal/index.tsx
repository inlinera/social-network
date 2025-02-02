import { useState } from 'react'
//COMPONENTS
import { Modal, Select } from 'antd'
import { UserFriendList } from '../lists'
//DATA
import { friendsModal } from '@/shared/data/friends-modal-tab'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import { observer } from 'mobx-react-lite'
import userApi from '@/shared/store/api/user/profile/user-api'

interface UserFriendModalProps {
  isOpened: boolean
  setIsOpened: (state: boolean) => void
}

export const UserFriendModal = observer(({ isOpened, setIsOpened }: UserFriendModalProps) => {
  const [friendOption, setFriendOption] = useState(0)
  const { userInfo } = userApi
  const { user } = authApi

  return (
    <Modal
      title={`${userInfo?.displayName}'s Friends`}
      open={isOpened}
      onCancel={() => setIsOpened(false)}
      footer={null}
    >
      {userInfo?.displayName == user?.displayName && (
        <Select
          value={friendsModal()[friendOption].label}
          onChange={val => setFriendOption(+val)}
          options={friendsModal()}
        />
      )}
      <div style={{ marginTop: '15px' }}>
        <UserFriendList arr={friendsModal()[friendOption].arr} listType={friendOption} />
      </div>
    </Modal>
  )
})
