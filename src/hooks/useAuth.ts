import { useMutation } from '@tanstack/react-query'
import { axiosRequest } from '../api/axios'
import { useSessionStorage } from './useStorage'

type User = {
  userId: string
  userName: string
}

type AuthData = {
  userName: string
  userPassword: string
}

type ResponseData = User & {
  token: string
}

export const useAuth = () => {
  const [user, setUser, removeUser] = useSessionStorage<User>('user', { userId: '', userName: '' })
  const [token, setToken, removeToken] = useSessionStorage<String>('token', '')

  const { mutate: mutateAuth } = useMutation({
    mutationFn: ({ userName, userPassword }: AuthData) => authRequest({ userName, userPassword }),
    onSuccess: data => {
      setUser({ userId: data.userId, userName: data.userName })
      setToken(data.token)
    },
  })

  const logout = () => {
    removeUser()
    removeToken()
  }

  const login = ({ userName, userPassword }: AuthData) => {
    mutateAuth({ userName, userPassword })
  }

  const isAuthorized = () => {
    if (!user || !token || (user.userId === '' && user.userName === '')) {
      return false
    }

    return true
  }

  return [login, logout, user, token, isAuthorized] as [
    login: ({ userName, userPassword }: AuthData) => void,
    logout: () => void,
    user: User | undefined,
    token: String | undefined,
    isAuthorized: () => boolean
  ]
}

const authRequest = async ({ userName, userPassword }: AuthData) => {
  const response = await axiosRequest<ResponseData>({
    method: 'post',
    url: `/auth`,
    data: { userName, userPassword },
  })

  return response
}
