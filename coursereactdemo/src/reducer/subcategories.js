const INITIAL_STATE = {
    subcatbyname: [],
    detailsoftopic:[],
    err_msg: '',
    // productCart:[]
}
export const FetchSubcatDatabyname = "FetchSubcatDatabyname";
export const FetchSubcatDatabyid = "FetchSubcatDatabyid";
// export const addDataToCart="addDataToCart";
export const InvalidData = "InvalidData"

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FetchSubcatDatabyname':
            return Object.assign({}, state, { subcatbyname: action.data });
        // case 'addDataToCart':{
        //     const cart=state.productCart.concat(action.data)
        //     return Object.assign({},state,{productCart:cart})
        // }
        case 'FetchSubcatDatabyid':
                return Object.assign({}, state, { detailsoftopic: action.data });

        case 'InvalidData': {
            return Object.assign({}, state, { err_msg: action.data })
        }
        default:
            return state;
    }
}