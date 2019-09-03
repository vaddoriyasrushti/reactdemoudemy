const INITIAL_STATE = {
    items: "",
}
export const SOME_ACTION = 'SOME_ACTION';
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SOME_ACTION':
            let pathname = action.pathname
            return Object.assign({}, state, { items: pathname });

        default:
            return state;
    }
}