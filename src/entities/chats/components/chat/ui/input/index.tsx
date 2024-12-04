import { useState } from 'react'
import { PaperClipOutlined, SendOutlined } from '@ant-design/icons'
import s from './index.module.scss'

export const ChatInputUI = () => {
  const [val, setVal] = useState('')
  return (
    <div className={`${s.input} flex aic`}>
      <input
        className={`${s.inputUi}`}
        placeholder="Enter your message"
        type="text"
        value={val}
        onChange={e => setVal(e.target.value)}
      />
      <div className={`${s.inputEnd} flex aic`}>
        <button className="fz17">
          <PaperClipOutlined style={{ color: 'gray' }} />
        </button>
        <button className="fz17">
          <SendOutlined />
        </button>
      </div>
    </div>
  )
}
