import { useState } from 'react'
import s from './index.module.scss'
import { IContent, items } from '@/shared/data/settings/settings-list'
import { observer } from 'mobx-react-lite'

export const SettingsPage = observer(() => {
  const [activeType, setActiveType] = useState(0)

  return (
    <div className={`${s.mainSettings} flex fdc aic jcc`}>
      <div className={`${s.mainSettings__buttons}`}>
        {items().map(t => (
          <button
            className={`${activeType == t.code && s.active} cw`}
            onClick={() => setActiveType(t.code)}
            key={t.name}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className={`${s.mainSettings__info}`}>
        {items()[activeType]?.content?.map((item: IContent, id: number) => (
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
})
