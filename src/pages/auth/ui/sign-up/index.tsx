import { useState } from 'react'
import s from '@/pages/auth/ui/_styles/index.module.scss'
import { observer } from 'mobx-react-lite'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import storageApi from '@/shared/store/api/storage/storage-api'
//COMPONENTS
import { Input, Avatar } from 'antd'
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
//ICONS
import { UserOutlined } from '@ant-design/icons'
//DATA
import { nullUser } from '@/shared/data/null-user'

interface SignUpProps {
  setIsReg: (isReg: boolean) => void
}

export const SignUp = observer(({ setIsReg }: SignUpProps) => {
  const { signUp, error } = authApi
  const { image, uploadAvatar } = storageApi

  //ANTD COMPONENT
  const { TextArea } = Input

  const [userData, setUserData] = useState(nullUser)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signUp(userData)
    setUserData(nullUser)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const downloadURL = await uploadAvatar(e.target.files[0])
      setUserData({ ...userData, avatarUrl: downloadURL as string })
    }
  }

  return (
    <div className={`${s.signForm} grid jcc aic tac`}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        Choose your Avatar
        <div className="grid jcc aic">
          <Avatar
            size={90}
            icon={image ? <img src={image as string} alt="avatar" /> : <UserOutlined />}
            className="x-auto"
          />
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <Input
            type="text"
            placeholder="name"
            value={userData.displayName}
            onChange={e => setUserData({ ...userData, displayName: e.target.value })}
            maxLength={20}
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="email"
            value={userData.email}
            onChange={e => setUserData({ ...userData, email: e.target.value })}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="password"
            value={userData.password}
            onChange={e => setUserData({ ...userData, password: e.target.value })}
          />
          <TextArea
            placeholder="description"
            maxLength={200}
            value={userData.description}
            onChange={e => setUserData({ ...userData, description: e.target.value })}
            style={{ height: 120, resize: 'none' }}
          />
        </div>
        <RedButtonUI onClick={handleSubmit}>Sign Up</RedButtonUI>
      </form>
      <button onClick={() => setIsReg(false)}>I'm already have account</button>
      {error && error}
    </div>
  )
})
