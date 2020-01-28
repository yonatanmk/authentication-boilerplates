import axios from 'axios';

export default params => {
  const token = localStorage.getItem('token');
  const headers = params.headers || {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return axios({
    ...params,
    headers
  })
}