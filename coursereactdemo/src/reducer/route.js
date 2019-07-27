const INITIAL_STATE = {
    pathname:"",
}
export const SOME_ACTION= 'SOME_ACTION';
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SOME_ACTION':
        let pathname = action.pathname 
        return Object.assign({}, state, { pathname:pathname });

        default:
            return state;
    }
}

