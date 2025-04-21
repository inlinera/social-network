import { useState } from 'react'

import { newArray } from '@/shared/constants/posts/handleLike'

import handleLikeApi from '@/shared/store/api/posts/post/details/handle-like-api'

import { IUser } from '@/shared/interfaces/IUser'

export const useLikePost = <T extends IUser>(id: string, likes: string[], user?: T | null) => {
  const { handlePostLike } = handleLikeApi

  const [postLikes, setPostLikes] = useState(likes)
  const [loading, setLoading] = useState(false)
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false)

  const handleLike = async () => {
    if (!user) return setIsAuthModalOpened(true)
    setLoading(true)
    try {
      const updatedLikes = newArray(postLikes, user.displayName)
      await handlePostLike(id, user.displayName)
      setPostLikes(updatedLikes)
    } finally {
      setLoading(false)
    }
  }

  return { loading, isAuthModalOpened, setIsAuthModalOpened, postLikes, handleLike }
}
