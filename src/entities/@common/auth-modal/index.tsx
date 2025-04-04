import s from './index.module.scss'

import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { PostBtn } from '@/shared/ui/buttons/post-button'
import { ModalUi, ModalUiProps } from '@/shared/ui/modal'

import { useNav } from '@/shared/hooks/useNav'

export const AuthModal = ({ isOpened, setIsOpened }: ModalUiProps) => {
  const navigate = useNav('/auth')

  return (
    <ModalUi isOpened={isOpened} setIsOpened={setIsOpened}>
      <div className={`${s.content}`}>
        <p>Необходима авторизация</p>
        <div className={`${s.footer} flex aic`}>
          <RedButtonUI onClick={navigate}>Авторизоваться</RedButtonUI>
          <PostBtn onClick={() => setIsOpened(false)}>Отмена</PostBtn>
        </div>
      </div>
    </ModalUi>
  )
}
