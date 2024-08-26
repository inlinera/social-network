import { useState } from "react"
//COMPONENTS
import { SignUp } from "./signUp"
import { SignIn } from "./signIn"

export const AuthPage = () => {
    const [isReg, setIsReg] = useState<boolean>(true)
  return (
    <div>
        {
            isReg ?
            <SignUp setIsReg={setIsReg}/>
            :
            <SignIn/>
        }
    </div>
  )
}
