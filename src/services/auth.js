import axios from 'axios'
import router from '@/router'
import { Buffer } from 'buffer';

window.Buffer = Buffer;

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
})

export const TokenName = 'docfacil'
export const RefreshTokenName = 'docfacil-refresh'

export const getToken = () => {
  const token = localStorage.getItem(TokenName);
  return token
}

export const getRefreshToken = () => {
  const token = localStorage.getItem(RefreshTokenName);
  return token
}

export const setToken = async (res) => {
  // Adiciona tempo de expiração do token
  const objectJWT = await parseJWT(res.data.token)
  const timer = objectJWT.exp * 1000
  const user = {
    exp: timer,
    ... res.data
  }
  localStorage.setItem(TokenName, JSON.stringify(user))
}

export const parseJWT = async (token) => {
  let base64Payload = token.split('.')[1];
  let payload = Buffer.from(base64Payload, 'base64');
  return JSON.parse(payload);
}

export const handleLoginService = async (token) => {
  return http.post('auth/', { token: token })
}

export const handleRenewService = async (token) => {
  return http.post('auth/renew/', { token: token }, {headers: {'Authorization': `Bearer ${token}`}})
}

export const setAuthToken = res => {
  setToken(res)
  // Redireciona pra tela de início
  setTimeout(function () {
    router.push({ name: "home" })
  }, 2000);
}

export const isValidToken = user => {
  if (!user) {
    return false
  }

  const currentTime = Date.now()
  return user.exp > currentTime
}

export const clearToken = () => {
  // Remove dados do usuário do storage
  localStorage.removeItem(`${TokenName}`)
  // Redireciona para tela de login
  router.push({ name: "Login" })
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem(`${TokenName}`))
}