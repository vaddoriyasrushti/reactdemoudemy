const INITIAL_STATE = {
    categories: [],
    err_msg: '',
    // productCart:[]
}
export const FetchCategoriesData = "FetchCategoriesData";
// export const addDataToCart="addDataToCart";
export const InvalidData = "InvalidData"

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FetchCategoriesData':
            return Object.assign({}, state, { categories: action.data });
        // case 'addDataToCart':{
        //     const cart=state.productCart.concat(action.data)
        //     return Object.assign({},state,{productCart:cart})
        // }
        case 'InvalidData': {
            return Object.assign({}, state, { err_msg: action.data })
        }
        default:
            return state;
    }
}