const INITIAL_STATE = {
    //coursecart:[],
    courseCart:[]
}
export const FetchCartdataofuser = "FetchCartdataofuser";
export const DeleteCartdata = "DeleteCartdata";
export const Postcartdata = 'Postcartdata';
export const addDataToCart="addDataToCart";
export const InvalidData = "InvalidData"

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FetchCartdataofuser':
            return Object.assign({}, state, { subcatbyname: action.data });

        case 'addDataToCart':{
            return Object.assign({},state,{ courseCart:action.data })
        }

        case 'DeleteCartdata':
                return Object.assign({}, state, { detailsoftopic: action.data });
                
        case 'Postcartdata':
                return Object.assign({},state,{allcourses:action.data});

        case 'InvalidData': {
            return Object.assign({}, state, { err_msg: action.data })
        }
        default:
            return state;
    }
}