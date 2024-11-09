import s from './index.module.scss'
//COMPONENTS
import { RedButtonUI } from '@/shared/ui/buttons/red-button'
import { Input } from 'antd'
import { Link } from 'react-router-dom'
import createPostApi from '@/shared/store/create-post-api'
import { useState } from 'react'

export const AddPostBlockEntity = () => {
  const { createPost } = createPostApi

  const { TextArea } = Input

  const [value, setValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault()
    createPost(value)
    setValue('')
  }

  return (
    <form className={`${s.add_post_block} flex jcc aic`} onSubmit={handleSubmit}>
      <div className={s.add_post_block_input}>
        <h3>You can write a post :)</h3>
        <TextArea
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter post content"
          maxLength={300}
          rows={2}
        />
      </div>
      <div className={`${s.add_post_block__buttons} flex fdc aic`}>
        <RedButtonUI onClick={handleSubmit}>Add new post</RedButtonUI>
        <Link to={'/rules'} className="cg fz10">
          Content rules*
        </Link>
      </div>
    </form>
  )
}
