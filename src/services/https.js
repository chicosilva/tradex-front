import axios from 'axios'
import store from '@/store'
import { getToken, setToken, getRefreshToken } from '@/services/auth'


const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 1000 * 60,
})


client.interceptors.request.use((config) => {
  store.commit('loading/setLoading', true)
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config
}, (err) => {
  return Promise.reject(err)
})

function handleResponse(response) {
  const statusCode = response?.status || 999
  const data = response?.data || []
  const text = response?.text || []
  const status = statusCode >= 200 && statusCode < 300 ? 'success' : 'error'

  if (statusCode === 401) {
    localStorage.removeItem('User');
    localStorage.removeItem('docfacil');
    localStorage.removeItem('docfacil-refresh');
  }

  store.commit('loading/setLoading', false)
  return { status, statusCode, text, data }
}

export const renewToken = async () => {
  const response = await axios.post(process.env.VUE_APP_API_URL + '/api/token/refresh/', { "refresh": getRefreshToken()})
  if (response?.status === 200) {
    setToken(response);
  }

  return response
}


client.interceptors.response.use(
  res => handleResponse(res),
  err => {    
    if (err.code === "ECONNABORTED") {
      return handleResponse({status: 997})
    } 
    if (err.message === "Network Error") {
      return handleResponse({status: 998})
    }
    return handleResponse(err.response) 
  }
)

export default client