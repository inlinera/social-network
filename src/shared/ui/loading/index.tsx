import s from './index.module.scss'

export const LoadingUI = () => {
  return (
    <div className={`${s.loading} flex aic jcc`}>
      <div className={s.loading__circle} />
    </div>
  )
}
