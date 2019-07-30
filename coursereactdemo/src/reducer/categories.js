const INITIAL_STATE = {
    categories: [],
    err_msg: '',
}
export const FetchCategoriesData = "FetchCategoriesData";
export const InvalidData = "InvalidData"

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FetchCategoriesData':
            return Object.assign({}, state, { categories: action.data });

        case 'InvalidData': {
            return Object.assign({}, state, { err_msg: action.data })
        }
        default:
            return state;
    }
}