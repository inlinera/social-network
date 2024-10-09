import { useNavigate } from "react-router-dom"

export const useNav = (url: string): () => void => {
    const navigate = useNavigate()
    return () => navigate(url)
}