import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(function (config) { return config; });

// Add a response interceptor
axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        if (error.message === 'Network Error')
            alert('No Internet, You are Offline!')
    }
    return Promise.reject(error)
})

export const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}
