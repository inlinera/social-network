import { useNavigate } from 'react-router-dom'

export const useNav = (url: string) => {
  const navigate = useNavigate()
  return () => navigate(url)
}
