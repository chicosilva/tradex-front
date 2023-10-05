import Http, { renewToken } from './https';

export const criar = async (params) => {
  const { data, status, text } = await Http.post('/servicos/servicos/', params);
  return {data, status, text}
}

export const atualizar = async (params, id) => {
  const { data, status, text } = await Http.patch(`/servicos/servicos/${id}/`, params);
  return {data, status, text}
}

export const desativar = async (params, id) => {
  const { data, status, text } = await Http.patch(`/servicos/servicos/${id}/`, params);
  return {data, status, text}
}

export const listarTodos = async (extraParams = {}) => {
  await renewToken()
  const params = {...extraParams }
  return Http.get('/servicos/servicos/', { params })
}

export const obterServicoPorId = async (id) => {
  await renewToken()
  const {data, status, text} = await Http.get(`/servicos/servicos/${id}/`)
  return {data, status, text}
}