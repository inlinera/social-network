import s from './index.module.scss'

import { rules } from '@/shared/data/posts_rules'
import { setTitle } from '@/shared/constants/setTitle'

const RulesPage = () => {
  setTitle('rules')

  return (
    <div className={`${s.rules} flex fdc jcc`}>
      {rules.map((rules, id) => {
        return (
          <div key={id}>
            <h2>
              {id + 1}. {rules.title}
            </h2>
            <ul className="flex fdc">
              {rules.content.map(rule => (
                <li key={rule}>• {rule}</li>
              ))}
            </ul>
          </div>
        )
      })}
      <span>• Продолжая пользоваться соцсетью вы автоматически соглашаетесь с правилами</span>
    </div>
  )
}

export default RulesPage
