import { IUser } from "../interfaces/IUser";

export const nullUser: IUser = Object({
    displayName: '',
    email: '',
    password: '',
    description: '',
    isPremium: false,
    avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/wunderkids-social-network.appspot.com/o/files%2Favatars%2Fdefault-image.jpg?alt=media&token=6706a886-9c74-4cb1-a91c-6d6986a10260'
  })