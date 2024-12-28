import axios, { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

export const axiosRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axiosInstance.request<T>(config)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.msg
      console.error('Server Error:', serverMessage || error.message)
      throw new Error(serverMessage || 'An unexpected error occurred')
    } else {
      console.error('Unexpected Error:', error)
      throw error
    }
  }
}

export default axiosInstance
