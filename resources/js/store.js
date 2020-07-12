import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './services/AuthService'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        apiUrl: `${window.location.protocol}//${window.location.hostname}:8000`,
        isLoggedIn: !!auth.getLoccalStorageItem('access_token'),
        access_token: auth.getLoccalStorageItem('access_token'),
        expires_in: auth.getLoccalStorageItem('expires_in'),
        refresh_token: auth.getLoccalStorageItem('refresh_token'),
        token_type: auth.getLoccalStorageItem('token_type'),
        user: auth.getLoccalStorageItem('user'),
        expirartionDate: auth.getLoccalStorageItem('expirartionDate'),
        tokenTimer:''
    },

    mutations: {
        LoginUser (state, data) {
            state.isLoggedIn = true
            state.access_token = data.access_token
            state.expires_in = data.expires_in
            state.refresh_token = data.refresh_token
            state.token_type = data.token_type
            const now = new Date();
            const expirartionDate = new Date(now.getTime() + data.expires_in * 1000)
            state.expirartionDate = expirartionDate

            auth.setLoccalStorageItem('access_token', data.access_token)
            auth.setLoccalStorageItem('expires_in', data.expires_in)
            auth.setLoccalStorageItem('refresh_token', data.refresh_token)
            auth.setLoccalStorageItem('token_type', data.token_type)
            auth.setLoccalStorageItem('expirartionDate', expirartionDate.toISOString())

            auth.setAuthTimer(data.expires_in);

        },
        UserData(state, data) {
            state.user = JSON.stringify(data.user)
            auth.setLoccalStorageItem('user', JSON.stringify(data.user))
        },

        SetAccessToken(state, data) {
            state.access_token = data
        },

        SetTokenTimer(state, data) {
            state.tokenTimer = data
        },

        SetIsLoggedIn(state, data) {
            state.isLoggedIn = data
        },

        LogoutUser (state) {
            state.isLoggedIn = false
            auth.clearLoccalStorage()
        }

    }
})
