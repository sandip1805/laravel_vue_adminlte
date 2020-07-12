import store from './../store';
import axios from 'axios';
import * as auth from './AuthService'

export function InitialRequest() {
    axios.interceptors.request.use(function (config) {
        config.baseURL = store.state.apiUrl
        let access_token = store.state.access_token || null
        let token_type = store.state.token_type || null
        if (access_token && token_type) {
            config.headers.Authorization = `${token_type} ${access_token}`;
        }
        return config;
    }, function (err) {
        auth.logout(false)
        return Promise.reject(err);
    });
}
