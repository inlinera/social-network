import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import authorizationApi from '@/shared/store/auth-api'
import userStore from '@/shared/store/user-api'

export const UserPage = observer(() => {
  const { userInfo, getUser, loading, error } = userStore
  const { userId } = useParams();
  const { user } = authorizationApi;

  useEffect(() => {
      console.log('User ID:', userId)
      if (userId) 
      getUser(userId)
  }, [userId, user])

  return (
    <div>
      {loading
        ? 'Loading'
        : <div>
            <p>{userInfo?.displayName}</p>
            <div>
              {userInfo?.description}
            </div>
          </div>
      }
      <p>
      {error && `You can view only your friends, add to friends this user to view him profile,
       error: ${error}`}
      </p>
    </div>
  )
})