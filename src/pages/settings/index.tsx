import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

import { IContent, items } from '@/shared/data/settings/settings'

export const SettingsPage = observer(() => {
  const [activeType, setActiveType] = useState(0)

  return (
    <div className={'flex fdc jcc aic'}>
      <div className={`${s.mainSettings} flex fdc aic jcc`}>
        <div className={`${s.mainSettings__buttons}`}>
          {items().map(t => (
            <button
              className={`${activeType == t.code && s.active}`}
              onClick={() => setActiveType(t.code)}
              key={t.name}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className={`${s.mainSettings__info}`}>
          {items()[activeType]?.content?.map((item: IContent) => (
            <div className={`${s.info__setting} flex fdc`} key={item.name}>
              <div>
                <span>{item.name}: </span>
                <span>{item.value}</span>
                {item.info && item.info}
              </div>
              <div>{item.content && item.content}</div>
            </div>
          ))}
        </div>
      </div>
      <b style={{ marginTop: '5px', color: 'var(--g-color)' }}>
        made by 2hills or _dexter, @duckowa
      </b>
    </div>
  )
})
