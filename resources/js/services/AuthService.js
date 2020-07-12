import store from './../store'
//import { http } from './HttpService'
import router from './../router'
import axios from 'axios';

export function setLoccalStorageItem(keyName, value) {
    return localStorage.setItem(keyName, value)
}

export function getLoccalStorageItem(keyName) {
    return localStorage.getItem(keyName)
}

export function removeLoccalStorageItem(keyName) {
    return localStorage.removeItem(keyName)
}

export function clearLoccalStorage() {
    return localStorage.clear()
}
export function autoLogin() {
    const authInformation = getAuthData();
    if (!authInformation) {
        return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirartionDate.getTime() - now.getTime();
    if (expiresIn > 0) {
        store.commit('SetAccessToken', authInformation.access_token)
        store.commit('SetIsLoggedIn', true)
        setAuthTimer(expiresIn / 1000);
    }
}

export function login(postData) {
    return axios.post(`/api/login`, postData)
}
export function register(postData) {
    return axios.post(`/api/register`, postData)
}

export function logout() {
    Toast.fire({
        icon: 'success',
        title: 'Your session is expired!'
    })
    store.commit('LogoutUser')
    clearTimeout(store.state.tokenTimer);
    router.push({ name: 'login' }).catch(err => err)
}

export function setAuthTimer(duration) {
    //console.log(duration * 1000);
    const tokenTimer = setTimeout(()=>{
    logout();
    }, duration * 1000);
    store.commit('SetTokenTimer', tokenTimer)
}

export function getAuthData() {
    const access_token = store.state.access_token;
    const expirartionDate = store.state.expirartionDate;
    if (!access_token || !expirartionDate) {
        return;
    }

    return {
        access_token,
        expirartionDate: new Date(expirartionDate),
    }

}


