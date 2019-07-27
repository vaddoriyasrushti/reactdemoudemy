import * as authService from '../service/auth';
import { FAILED, LOGIN_SUCCESSFUL, LOGOUT } from '../reducer/auth';

export const loginUser = (credentials) => {
    return (dispatch) => {
        return new Promise((resolve,reject)=>{
        authService.login(credentials)
            .then((response) => {
                console.log("status",response.status)
                if (response.data.status) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                    dispatch({
                        type: LOGIN_SUCCESSFUL,
                        data: response.data
                    });
                    resolve(response)
                }
                else{
                    reject(response.data.message)
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
                }
            });
    })}
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });
        localStorage.removeItem("user");
    }
};

export const RegisterUser = (credentials) => {
    return (dispatch) => {
        return new Promise((resolve,reject)=>{
        authService.signUp(credentials)
            .then((response) => {
                console.log("signup",response)
                if (response.data.status) {
                    let credentials_Login = {
                        email: credentials.email,
                        password: credentials.password,
                        role:credentials.role
                    }
                    dispatch(loginUser(credentials_Login))
                    resolve(response)
                }
                else{
                    reject(response.data.message)
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
                }
            })
    })
}
}

