const INITIAL_STATE = {
    token: localStorage.getItem('user')?true:false,
    user:[],
    error_msg: "",
}
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const FAILED = 'FAILED';
export const LOGOUT = 'LOGOUT';
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESSFUL: {
            return Object.assign({}, state, {
                user:action.data,
                token: true,
                error_msg: ""
            });
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: action.data.message });
        }
        case LOGOUT: {
            return Object.assign({}, state, { token:false, userId: "", Role: "" });
        }

        default:
            return state;
    }
}