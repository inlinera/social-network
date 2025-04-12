import { useGetAvatar } from '@/shared/hooks/details/useGetAvatar'

export type AvatarT = string | null

export const handleView = async (
  userName: string,
  inView: boolean,
  avatar: AvatarT,
  setAvatar: (_: AvatarT) => void
) => {
  if (inView && !avatar) {
    setAvatar(await useGetAvatar(userName))
  }
}
