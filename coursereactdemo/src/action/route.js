import { SOME_ACTION } from "../reducer/route";

export const someAction = (pathname) => {
    return (dispatch) => {
        dispatch({
            type: SOME_ACTION,
            pathname: pathname
        });
    }
}   



