import { useState } from 'react'
import s from './index.module.scss'

import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { UserAddPostModal } from './ui/modal'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const AddPostBlockEntity = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { t } = useTranslation()

  return (
    <>
      <UserAddPostModal isOpened={isOpened} setIsOpened={setIsOpened} />
      <div className={s.add_post}>
        <div className={`${s.add_post_block} flex jcc aic`}>
          <div className={s.add_post_block_input}>
            <h3>{t('profile.posts.add_post.text')} :)</h3>
          </div>
          <div className={`${s.add_post_block__buttons} flex fdc aic`}>
            <RedButtonUI onClick={() => setIsOpened(true)}>{t('profile.posts.add_post.btnText')}</RedButtonUI>
            <Link to={'/rules'} className="fz10">
              {t('profile.posts.add_post.rule')}*
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
