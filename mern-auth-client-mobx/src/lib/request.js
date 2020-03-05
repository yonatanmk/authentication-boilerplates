import axios from 'axios';
import { getLocalStorage } from 'lib/auth-utils'

export default params => {
  const token = getLocalStorage('token');
  // const headers = params.headers || {};
  // if (token) headers.Authorization = `Bearer ${token}`;
  const headers = {
    ...(params && params.headers),
    ...(token && { Authorization: `Bearer ${token}` })
  }
  console.log({ headers })
  return axios({
    ...params,
    headers
  })
}