import s from './index.module.scss'

interface ModalUiProps extends React.HTMLProps<HTMLDivElement> {
  setIsOpened: (_: boolean) => void
}

export const ModalUi = ({ setIsOpened, children }: ModalUiProps) => {
  return (
    <div className={`${s['modal-ui']} flex jcc aic`} onClick={() => setIsOpened(false)}>
      <div className={`${s.modal}`} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
