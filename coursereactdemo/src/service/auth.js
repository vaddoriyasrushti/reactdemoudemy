import baseService from './baseservice'

export function login(credential) {
    return baseService.post('/signin', credential);
}

export function signUp(data) {
    return baseService.post('/signup', data);
}