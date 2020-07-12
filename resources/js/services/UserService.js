import axios from 'axios';

export function create(postData) {
    return axios.post(`/api/user`, postData)
}

export function edit(id) {
    return axios.get(`/api/user/${id}`)
}

export function update(id, postData) {
    return axios.put(`/api/user/${id}`, postData)
}

export function users() {
    return axios.get(`/api/user`)
}

export function deleteUser(id) {
    return axios.delete(`api/user/${id}`)
}

export function profile() {
    return axios.get(`/api/profile`)
}

export function updateProfile(postData) {
    return axios.put(`/api/profile`, postData)
}
