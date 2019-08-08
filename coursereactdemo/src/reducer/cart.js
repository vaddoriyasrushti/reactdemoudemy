const INITIAL_STATE = {
    courseCart: []
}
export const PostCartItem = 'PostCartItem';
export const addDataToCart = "addDataToCart";
export const FetchCartitemofuser = "FetchCartitemofuser";
export const emptycourse = "emptycourse";
export const DeleteCartdata = "DeleteCartdata";
export const InvalidData = "InvalidData"

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'addDataToCart': {
            return Object.assign({}, state, { courseCart: action.data })
        }

        case 'PostCartItem':
            const cart = state.courseCart.concat(action.data)
            return Object.assign({}, state, { courseCart: cart });

        case 'FetchCartitemofuser':
            return Object.assign({}, state, { courseCart: action.data });

        case 'emptycourse':
            return Object.assign({}, state, { courseCart: [] });

        case 'DeleteCartdata':
             state.courseCart.splice(action.pos,1)
            return Object.assign({}, state, { courseCart: state.courseCart});


        case 'InvalidData': {
            return Object.assign({}, state, { err_msg: action.data })
        }
        default:
            return state;
    }
}