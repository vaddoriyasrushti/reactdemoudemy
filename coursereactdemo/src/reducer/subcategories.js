const INITIAL_STATE = {
    allcourses: [],
    subcatbyname: [],
    detailsoftopic: [],
    subcat:[],
    err_msg: '',
    
    // productCart:[]
}
export const FetchSubcatDatabyname = "FetchSubcatDatabyname";
export const FetchSubcatDatabyid = "FetchSubcatDatabyid";
export const FetchAllSubcategories = 'FetchAllSubcategories';
export const FetchSubcatbycatname = "FetchSubcatbycatname";
export const InvalidData = "InvalidData"

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FetchSubcatDatabyname':
            return Object.assign({}, state, { subcatbyname: action.data });

        case 'FetchSubcatDatabyid':
            return Object.assign({}, state, { detailsoftopic: action.data });

        case 'FetchAllSubcategories':
            return Object.assign({}, state, { allcourses: action.data });

        case 'FetchSubcatbycatname':
            return Object.assign({}, state, { subcat: action.data });

        case 'InvalidData': {
            return Object.assign({}, state, { err_msg: action.data })
        }
        default:
            return state;
    }
}