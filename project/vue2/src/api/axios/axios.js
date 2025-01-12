import axios from 'axios';

const request = axios.create ( {
	timeout : 1000 * 60 ,
	baseURL : 'https://hn216.api.yesapi.cn' ,
} );
request.interceptors.request.use ( ( config ) => {
	return config;
} );
request.interceptors.response.use ( ( config ) => {
	return config;
} );
export { request };
