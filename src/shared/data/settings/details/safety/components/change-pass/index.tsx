import authApi from '@/shared/store/api/user/auth/auth-api'
import { InputUi } from '@/shared/ui/input'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

export const ChangePassComponent = observer(() => {
  const { changePassword } = authApi

  const [pass, setPass] = useState('')
  const [currPass, setCurrPass] = useState('')

  const handleChangePassword = () =>
    changePassword(pass, currPass).then(() => {
      setPass('')
      setCurrPass('')
    })

  return (
    <div className="flex fdc">
      <InputUi
        value={currPass}
        setVal={setCurrPass}
        minLength={6}
        maxLength={25}
        placeholder="Enter current password..."
      />
      <div className="flex jcc aic">
        <InputUi
          value={pass}
          setVal={setPass}
          minLength={6}
          maxLength={25}
          placeholder="Enter new password..."
        />
        <button onClick={handleChangePassword}>Change</button>
      </div>
    </div>
  )
})
