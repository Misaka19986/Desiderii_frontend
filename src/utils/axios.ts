/*
* Setting axios
*/
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { postRefreshTokens } from './API.ts'
import router from '../router/index.ts'
import axiosRetry from 'axios-retry'

const API = axios.create({
  baseURL: "http://localhost:8090",
  headers: {
    Accept:"application/json",
  },
  timeout: 30000,
  withCredentials: true,

  // Retry
  
})

// axiosRetry(API, {
//   retries: 3, // 设置重试次数
//   retryDelay: () => 500, // 设置重试延迟时间
//   shouldResetTimeout: true, // 重置请求超时时间
// })

function responseSuccessHandler(response: AxiosResponse){
  switch(response.status){
    default:
      return
  }
}

function responseErrorHandler(error: AxiosError){
  console.log('Response error')

  let data = error.response?.data

  switch(error.response?.status){
    case 401:

      // If access token expired
      if(data['messages']['0']['token_type'] == 'access'){
        console.log('Token expired')

        const refreshToken = localStorage.getItem('refreshToken')
        
        if(refreshToken){
          postRefreshTokens().then(
            (res) => {
              if(!res){
                localStorage.clear()
                router.push('/')
              }else{
                console.log('Refresh success')

                API.request(error.config)
              }
            }
          )
        }
      }

      break

    case 403:
      console.log('Forbidden')

      const accessToken = localStorage.getItem('accessToken')

      if(accessToken){
        API.request(error.config)
      }else{
        
      }

      break
    default:
      return
  }

  return
}

// Handle request
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken')
    // const refreshToken = localStorage.getItem('refreshToken')

    // Tokens not null
    if(accessToken){
      config.headers.Authorization = 'Bearer ' + accessToken
      // config.headers.refreshToken = refreshToken
    }

    // Login or register
    // TODO: params with request 通过请求传参
    return config
  },
  (error: AxiosError) => {
    console.log('request error:\n' + error)

    return Promise.reject(error)
  }
)

// Handle response
API.interceptors.response.use(
  (response: AxiosResponse) => {
    responseSuccessHandler(response)

    return Promise.resolve(response)
  },
  (error: AxiosError) => {
    responseErrorHandler(error)
    
    // return Promise.reject(error)
  }
)

export default API