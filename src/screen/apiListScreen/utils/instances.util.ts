/* eslint-disable no-unused-expressions */
import axios from 'axios';

const instance = axios.create({
  baseURL: '',
});

instance.interceptors.request.use(
  async request => {
    request.headers['Content-Type'] = 'application/json';
    request.headers['Access-Control-Allow-Methods'] =
      'GET, PUT, POST, DELETE, OPTIONS';
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response?.data;
  },
  async error => {
    return error?.response?.data;
  },
);

export default instance;
