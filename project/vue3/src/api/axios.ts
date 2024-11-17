//// @ts-nocheck

// 定义请求配置
interface RequestConfig extends RequestInit {
    responseType?: 'json' | 'blob' | 'text' | 'arrayBuffer';
    params?:string
}
// 定义默认配置
type defaultConfig = {
    baseURL?: string;
};
// 定义请求类型
interface RequestType {
    // 构造函数调用签名
    new(options?: defaultConfig): RequestType;
    // 普通函数调用签名
    <T>(url: string, config?: RequestConfig): Promise<responseType<T>>;
    get<T>(url: string, config?: Omit<RequestConfig, 'method'>): Promise<responseType<T>>;
    post<T>(url: string, body?: any, config?: Omit<RequestConfig, 'method'>): Promise<responseType<T>>;
    interceptors: {
        request: {
            use: (fn: (config: RequestConfig) => RequestConfig) => void;
        };
        response: {
            use: (fn: (response: responseType<any>) => responseType<any>) => void;
        };
    };
}
// 定义响应类型
type responseType<T> = {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: ResponseType;
    readonly url: string;
    data: T;
};
type thisType = void|{
    interceptorsCallback?: { // 添加这个属性
        request: Function[];
        response: Function[];
    };
    baseURL?:string
}
// 定义请求函数
const request = async function (this: thisType, url: string, config?: RequestConfig) {
    if (config?.params) {
        const params = new URLSearchParams(config.params).toString();
        url += url.includes('?') ? `&${params}` : `?${params}`;
    }
    if (this?.interceptorsCallback?.request?.length) {
        for (const fn of this.interceptorsCallback.request) {
            config = await fn(config);
        }
    }
    return fetch(getUrl(url, this?.baseURL), config).then(async (response) => {
        const resInfo = {
            headers: {...response.headers},
            ok: response.ok,
            redirected: response.redirected,
            status: response.status,
            statusText: response.statusText,
            type: response.type,
            url: response.url,
        };
        const method = config?.responseType || 'text';
        const data = await response[method]();
        let res = { ...resInfo, data };
        if (this?.interceptorsCallback?.response?.length) {
            for (const fn of this.interceptorsCallback.response) {
                res = await fn(res);
            }
        }
        return res;
    });
};
// 定义请求原型
const requestPrototype = {
    get: function <T>(this: Function, url: string, requestConfig: Omit<RequestConfig, 'method'>): responseType<T> {
        return this(url, { ...requestConfig, method: 'GET' });
    },

    post: function <T> (this: Function, url: string, body: any, requestConfig: Omit<RequestConfig, 'method'>): responseType<T> {
        return this(url, { ...requestConfig, method: 'POST', body });
    }
};
interface RequestFunction {
    (url: string, config?: RequestConfig): Promise<responseType<any>>;
    interceptors?: {
        request: {
            use: (fn: (config: RequestConfig) => RequestConfig) => void;
        };
        response: {
            use: (fn: (response: responseType<any>) => responseType<any>) => void;
        };
    };
}
// 定义axios函数
const axios = function (urlOrOpt: string | defaultConfig, config?:RequestConfig) {
    if (new.target) {
        const interceptorsCallback: { request: Function[], response: Function[]} = {
            request: [],
            response: []
        };
        const rqt: RequestFunction = request.bind({
            ...urlOrOpt as defaultConfig,
            interceptorsCallback
        });
        rqt.interceptors = {
            request: {
                use: (fn:Function) => interceptorsCallback.request.push(fn)
            },
            response: {
                use: (fn: Function) => interceptorsCallback.response.push(fn)
            }
        };
        Object.setPrototypeOf(rqt, requestPrototype);
        return rqt;
    }
    return request(urlOrOpt as string, config);
} as RequestType;
// 设置axios原型    
Object.setPrototypeOf(axios, requestPrototype);
export default axios;

// 处理路径拼接
function getUrl(url:string, baseURL='') {
    // 检查是否为绝对 URL（包含协议）
    if (/^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)) {
        return url;
    }
    if (baseURL) {
        // 移除末尾的斜杠
        baseURL = baseURL.replace(/\/+$/, '');
        // 移除首部的斜杠
        url = url.replace(/^\/+/, '');
        return `${baseURL}/${url}`;
    }
    return url;
}
