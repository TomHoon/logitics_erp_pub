import axios from 'axios';

const baseApi = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: 'http://localhost:33000',
    withCredentials: true,
    timeout: 1000 * 30
});

baseApi.interceptors.response.use()

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);


export default baseApi;