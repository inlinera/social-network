import { useState } from 'react'
import s from './index.module.scss'
//COMPONENTS
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { UserAddPostModal } from './ui/modal'
import { Link } from 'react-router-dom'

export const AddPostBlockEntity = () => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div className={s.add_post}>
      <UserAddPostModal isOpened={isOpened} setIsOpened={setIsOpened} />
      <div className={`${s.add_post_block} flex jcc aic`}>
        <div className={s.add_post_block_input}>
          <h3>You can write a post :)</h3>
        </div>
        <div className={`${s.add_post_block__buttons} flex fdc aic`}>
          <RedButtonUI onClick={() => setIsOpened(true)}>Add new post</RedButtonUI>
          <Link to={'/rules'} className="cg fz10">
            Content rules*
          </Link>
        </div>
      </div>
    </div>
  )
}
