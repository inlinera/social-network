import s from './index.module.scss'

import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { PostBtn } from '@/shared/ui/buttons/post-button'
import { ModalUi, ModalUiProps } from '@/shared/ui/modal'

import { useNav } from '@/shared/hooks/useNav'
import { useTranslation } from 'react-i18next'

export const AuthModal = ({ isOpened, setIsOpened }: ModalUiProps) => {
  const { t } = useTranslation()

  const navigate = useNav('/auth')

  return (
    <ModalUi isOpened={isOpened} setIsOpened={setIsOpened}>
      <div className={`${s.content}`}>
        <p>{t('auth_modal._')}</p>
        <div className={`${s.footer} flex aic`}>
          <RedButtonUI onClick={navigate}>{t('auth_modal.next')}</RedButtonUI>
          <PostBtn onClick={() => setIsOpened(false)}>{t('auth_modal.cancel')}</PostBtn>
        </div>
      </div>
    </ModalUi>
  )
}
