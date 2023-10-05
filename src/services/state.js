import Http, { renewToken } from './https';

export const create = async (params) => {
  const { data, status, text } = await Http.post('/states/', params);
  return {data, status, text}
}

export const update = async (params) => {
  const { data, status, text } = await Http.patch(`/states/${params.id}/`, params);
  return {data, status, text}
}

export const getAll = async (extraParams = {}) => {
  await renewToken()
  const params = {...extraParams }
  return Http.get('/states/', { params })
}

export const getStateById = async (id) => {
  await renewToken()
  const {data, status, text} = await Http.get(`/states/${id}/`)
  return {data, status, text}
}