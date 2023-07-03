import axios from "axios";

let apiHost = `${process.env.REACT_APP_API_URL}api/`;
console.info(process.env.REACT_APP_API_URL);
export const axiosClient = axios.create({ baseURL: apiHost });

const headers = {
    'Content-Type': 'application/json',
    "Accept": "application/json",
}

axiosClient.interceptors.request.use(config => {
    //  Generate cancel token source
    let source = axios.CancelToken.source();
    // Set cancel token on 'this ENTERS HERE' request
    config.cancelToken = source.token;
    config.headers = headers;
    return config;
}, error => {
    return Promise.reject(error);
});

axiosClient.interceptors.response.use(response => {
    if (response.status === 200 || response.status === 201) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response);
    }
}, async (error) => {
    if (error.response.status) {
        switch (error.response.status) {
            case 400:
                break;
            case 404:
                break;
            case 403:
                break;
            case 502:
                break;
            case 422:
                break;
            default:
                break;
        }
        return Promise.reject(error.response);
    }
    return Promise.resolve(error.response);
});

export const http = {
    getReq: function (endPoint, options = {}) {
        return axiosClient.get(endPoint, options);
    },
    createReq: function (endPoint, datas, options = {}) {
        return axiosClient.post(endPoint, datas, options);
    },
    updateReq: function (endPoint, datas, options = {}) {
        return axiosClient.put(endPoint, datas, options);
    },
    deleteReq: function (endPoint, options = {}) {
        return axiosClient.delete(endPoint, { data: options });
    },
}