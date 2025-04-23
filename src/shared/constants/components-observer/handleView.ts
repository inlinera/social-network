import { useGetAvatar } from '@/shared/hooks/details/useGetAvatar'

export type AvatarT = string | null

export const handleView = async (
  userName: string,
  inView: boolean,
  avatar: AvatarT,
  setAvatar: (_: AvatarT) => void
) => {
  if (avatar) return

  if (inView) {
    const newAvatar = await useGetAvatar(userName)
    setAvatar(newAvatar)
  }
}
