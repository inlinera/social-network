import { useState } from 'react'
import { observer } from 'mobx-react-lite'
// COMPONENTS
import { Modal, Select } from 'antd'
import { UserFriendList } from './ui/list'
// DATA
import { items } from './constants'
// MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
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
      {userInfo?.displayName === user?.displayName && (
        <Select value={items()[friendOption].label} onChange={val => setFriendOption(+val)} options={items()} />
      )}
      <div style={{ marginTop: '1vh' }}>
        <UserFriendList arr={items()[friendOption].arr} listType={friendOption} />
      </div>
    </Modal>
  )
})
