import { Spin } from 'antd'

interface LoadingUIProps {
  children: React.ReactNode
}

export const LoadingUI = ({ children }: LoadingUIProps) => {
  return (
    <>
      <Spin size="large" />
      <p style={{ marginTop: '5px' }} className="cw">
        {children}
      </p>
    </>
  )
}
