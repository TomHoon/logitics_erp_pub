import axios from 'axios';

const baseApi = axios.create({
	headers: {
		'Content-Type': 'application/json',
	},
	baseURL: process.env.NODE_ENV === 'production' ? "" : 'http://localhost:33001',
	withCredentials: true,
	timeout: 1000 * 30,
});

baseApi.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

baseApi.interceptors.response.use();

baseApi.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		if (error.status === 401) {
			alert('올바른 로그인 정보가 아닙니다. 로그인 페이지로 이동합니다.');
			localStorage.clear();
			window.location.replace('/');
		}	
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export default baseApi;
