import { FetchCategoriesData, InvalidData } from "../reducer/categories";
import * as service from '../service/service'

export const FetchCategoriesDataAction = () => {
    return (dispatch) => {
        // return new Promise((resolve, reject) => {
            service.fetchcategories().then((res) => {
                if (res) {
                    dispatch({
                        type: FetchCategoriesData,
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

