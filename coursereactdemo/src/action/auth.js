import * as authService from '../service/auth';
import { FAILED, LOGIN_SUCCESSFUL, LOGOUT } from '../reducer/auth';
import { emptycourse } from '../reducer/cart'
import * as cartaction from './cart'

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
                    var user= JSON.parse(localStorage.getItem("user"))
                    var courses= JSON.parse(localStorage.getItem("courses"))
                    
                    dispatch(cartaction.getCartitembyuseridAction(user.user[0].userid)).then((res)=>{
                        if(courses){
                            courses.map((item)=>{
                                var data={
                                    userid:user.user[0].userid,
                                    catid:item.id
                                }
                                var elementPos = res.data.map(function (x) {
                                      return x.id;
                                    }).indexOf(item.id);
                            
                                    if (elementPos == -1) {
                                        dispatch(cartaction.postCartitemAction(data))
                                    }
                               
                            })
                            localStorage.removeItem("courses")
                        }
                    })
                    resolve(response)
                }
                else{
                    reject(response.data.message)
                }
            })
            .catch((error) => {
                if (error) {
                    console.log("error",error)
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
        localStorage.removeItem("courses");
        dispatch({
            type: emptycourse,
        });
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

