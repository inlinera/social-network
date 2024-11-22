import { useState } from 'react'
import s from './index.module.scss'
import { items } from '@/shared/data/settings-list'

export const SettingsPage = () => {
  const [activeType, setActiveType] = useState(items[0].type)

  return (
    <div className={`${s.mainSettings} flex fdc aic jcc`}>
      <div className={`${s.mainSettings__buttons}`}>
        {items.map(t => (
          <button
            className={`${activeType == t.type && s.active} cw`}
            onClick={() => setActiveType(t.type)}
            key={t.type}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className={`${s.mainSettings__info}`}></div>
    </div>
  )
}
