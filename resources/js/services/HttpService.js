import store from './../store';
import axios from 'axios';

// Creates a global http method to use for making request to the server
export function http() {
    let access_token = store.state.access_token || null
    let token_type = store.state.token_type || null
    if (access_token && token_type) {
        return axios.create({
            baseURL: store.state.apiUrl,
            headers: {
                Authorization: token_type + ' ' + access_token
            }
        });
    } else {
        return axios.create({
            baseURL: store.state.apiUrl
        });
    }

}
