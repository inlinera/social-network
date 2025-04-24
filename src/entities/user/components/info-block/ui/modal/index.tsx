import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { Modal, Select } from 'antd'
import { UserFriendList } from './ui/list'

import { useItems } from './constants'

import authApi from '@/shared/store/api/user/auth/auth-api'
import userApi from '@/shared/store/api/user/profile/user-api'

import { ChevronDown, Plus } from 'lucide-react'

import { useTranslation } from 'react-i18next'

interface UserFriendModalProps {
  isOpened: boolean
  setIsOpened: (state: boolean) => void
}

export const UserFriendModal = observer(({ isOpened, setIsOpened }: UserFriendModalProps) => {
  const [friendOption, setFriendOption] = useState(0)
  const { userInfo } = userApi
  const { user } = authApi

  const { t } = useTranslation()
  const options = useItems()

  return (
    <Modal
      title={t('profile.user_block.friends.modal._', { name: userInfo?.displayName })}
      open={isOpened}
      onCancel={() => setIsOpened(false)}
      footer={null}
      closeIcon={<Plus style={{ color: '#fff', rotate: '45deg' }} />}
    >
      {userInfo?.displayName === user?.displayName && (
        <Select
          value={options[friendOption].label}
          onChange={val => setFriendOption(+val)}
          options={options}
          suffixIcon={<ChevronDown style={{ paddingLeft: '5px', color: '#fff' }} />}
        />
      )}
      <div style={{ marginTop: '1vh' }}>
        <UserFriendList arr={options[friendOption].arr!} listType={friendOption} />
      </div>
    </Modal>
  )
})
