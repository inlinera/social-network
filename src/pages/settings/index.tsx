import { useState } from 'react'
import s from './index.module.scss'
import { items, ISetting } from '@/shared/data/settings/settings-list'

export const SettingsPage = () => {
  const [activeType, setActiveType] = useState<ISetting>(items()[0])

  return (
    <div className={`${s.mainSettings} flex fdc aic jcc`}>
      <div className={`${s.mainSettings__buttons}`}>
        {items().map(t => (
          <button
            className={`${activeType.name == t.name && s.active} cw`}
            onClick={() => setActiveType(t)}
            key={t.name}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className={`${s.mainSettings__info}`}>
        {activeType.content?.map((item, id: number) => (
          <div className={`${s.info__setting} flex fdc`} key={id}>
            <div>
              <span>{item.name}: </span>
              <span>{item.value}</span>
              {item.info && item.info}
            </div>
            {item.content && item.content}
          </div>
        ))}
      </div>
    </div>
  )
}
