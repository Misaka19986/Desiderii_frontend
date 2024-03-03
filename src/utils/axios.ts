/*
* Setting axios
*/
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const API = axios.create({
  baseURL: "http://localhost:8090",
  headers: {
    Accept:"application/json",
    "Content-Type":"application/json",
  },
  timeout: 30000,
})

function responseSuccessHandler(response: AxiosResponse){
  switch(response.status){
    default:
      return
  }
}

function responseErrorHandler(response: AxiosResponse){
  switch(response.status){
    default:
      return
  }
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
    // Use (.catch(error)) to process error
    return Promise.reject(error)
  }
)

// Handle response
API.interceptors.response.use(
  (response: AxiosResponse) => {
    responseSuccessHandler(response)
    // Use (.then) to process response
    return Promise.resolve(response)
  },
  (error: AxiosResponse) => {
    responseErrorHandler(error)
  }
)

export default API