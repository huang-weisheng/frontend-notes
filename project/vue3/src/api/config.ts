import axios from 'axios';
import { ElMessage } from 'element-plus'; // 引入ElMessage

// 创建一个axios实例
const request = axios.create({
    baseURL: '', // 设置基础URL
    timeout: 1000*60, // 设置请求超时时间
});

// 添加请求拦截器
request.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        return config;
    }
);

// 添加响应拦截器
request.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data;
    },
    error => {
        // 处理响应错误
        ElMessage.error('响应错误: ' + (error.response?.data?.message || '未知错误')); // 使用ElMessage提示
        return Promise.reject(error);
    }
);

export default request;

