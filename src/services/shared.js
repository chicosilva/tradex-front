import Http from './https';

export const getStatesService = async () => {
  return Http.get('/core/states/')
};


