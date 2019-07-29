import { FetchSubcatDatabyname, InvalidData, FetchSubcatDatabyid, FetchAllSubcategories } from "../reducer/subcategories";
import * as service from '../service/service'

export const FetchAllsubcatAction = () => {
    return (dispatch) => {
        // return new Promise((resolve, reject) => {
            service.fetchallsubcategories().then((res) => {
                if (res) {
                    dispatch({
                        type: FetchAllSubcategories,
                        data: res.data
                    });
                }
                // resolve(res)
            })
                .catch((error) => {
                    if (error.res) {
                        dispatch({
                            type: InvalidData,
                            data: "Invalid Data"
                        })
                    }
                })
        // })
    }
}

export const FetchsubcatbynameAction = (catname) => {
    return (dispatch) => {
        // return new Promise((resolve, reject) => {
            service.fetchsubcategoriesbyname(catname).then((res) => {
                if (res) {
                    dispatch({
                        type: FetchSubcatDatabyname,
                        data: res.data
                    });
                }
                // resolve(res)
            })
                .catch((error) => {
                    if (error.res) {
                        dispatch({
                            type: InvalidData,
                            data: "Invalid Data"
                        })
                    }
                })
        // })
    }
}
export const FetchsubcatbyidAction = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            service.fetchsubcategoriesbyid(id).then((res) => {
                if (res) {
                    dispatch({
                        type: FetchSubcatDatabyid,
                        data: res.data
                    });
                }
                resolve(res)
            })
                .catch((error) => {
                    if (error.res) {
                        dispatch({
                            type: InvalidData,
                            data: "Invalid Data"
                        })
                    }
                })
        })
    }
}

