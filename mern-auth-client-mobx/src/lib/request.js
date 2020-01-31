import axios from 'axios';
import { getLocalStorage } from 'lib/auth-utils'

export default params => {
  const token = getLocalStorage('token');
  const headers = params.headers || {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return axios({
    ...params,
    headers
  })
}