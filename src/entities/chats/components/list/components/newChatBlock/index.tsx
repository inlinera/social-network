import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'
// ICONS
import { ArrowLeft } from 'lucide-react'
// COMPONENTS
import { InputUi } from '@/shared/ui/input'
import { ChatComponent } from '../chat'

interface NewChatBlockProps {
  setIsVisible: (_: boolean) => void
}

export const NewChatBlock = observer(({ setIsVisible }: NewChatBlockProps) => {
  const [val, setVal] = useState('')

  return (
    <div className={`${s.newChatBlock} flex fdc`}>
      <div className={`${s.newChatBlock__up} flex aic`}>
        <button>
          <ArrowLeft onClick={() => setIsVisible(false)} />
        </button>
        <InputUi value={val} setVal={setVal} placeholder="Enter friend's name" />
      </div>
      <div className={`${s.newChatBlock__main} flex fdc aic`}>
        {Array.from({ length: 6 }, () => (
          <ChatComponent loading isTimeVisible={false} />
        ))}
      </div>
    </div>
  )
})
