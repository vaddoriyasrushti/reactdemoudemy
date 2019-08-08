import { FetchCartitemofuser, InvalidData, DeleteCartdata, PostCartItem, addDataToCart } from "../reducer/cart";
import * as cartservice from '../service/cart'
import * as service from '../service/service'

export const postCartitemAction = (data) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            cartservice.postcartitem(data)
                .then((res) => {
                    if (res) {
                        service.fetchsubcategoriesbyid(res.data.catid).then((res) => {
                            dispatch({
                                type: PostCartItem,
                                data: res.data
                            });
                        })
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
export const getCartitembyuseridAction = (userid) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            cartservice.getcartitembyuserid(userid)
                .then((res) => {
                    if (res) {
                        var x = [];
                        const results = res.data.map(async (item) => {
                            return service.fetchsubcategoriesbyid(item.catid).then((res) => {
                                x.push(res.data[0])
                            })
                        })
                        Promise.all(results).then((res) => {
                            dispatch({
                                type: FetchCartitemofuser,
                                data: x
                            })
                        })
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


export const addDataToCartAction = (data) => {
    return (dispatch) => {
        let products = [];
        var user = JSON.parse(localStorage.getItem("user"));
        var crs = JSON.parse(localStorage.getItem("courses"));
        if (user) {
            var x1 = {
                userid: user.user[0].userid,
                catid: data.id
            }
            dispatch(postCartitemAction(x1))
        }
        else {
            if (crs) {
                products = JSON.parse(localStorage.getItem('courses'));
            }
            products.push(data);
            localStorage.setItem('courses', JSON.stringify(products));
        }
    }
}
export const addCourse = (i) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            let course = []
            var x = 0;
            var user = JSON.parse(localStorage.getItem("user"));
            var crs = JSON.parse(localStorage.getItem("courses"));
            if (user) {
                var x2 = {
                    userid: user.user[0].userid,
                    catid: i.id
                }
                dispatch(postCartitemAction(x2))
            }
            else {
                if (crs) {
                    x = 1;
                    try {
                        course = JSON.parse(localStorage.getItem('courses'));
                        dispatch({
                            type: addDataToCart,
                            data: [...crs]
                        })
                    }
                    catch (e) {
                        localStorage.removeItem("courses");
                    }
                }
                course.push(i);
                var y = [i]
                if (x === 1) {
                    y = [...course]
                    // y = [...z].concat(i)
                }
                dispatch({
                    type: addDataToCart,
                    data: [...y]
                })
                const parsed = JSON.stringify(course);
                localStorage.setItem("courses", parsed);

            }
        })
    }
}
export const addstoragetoredux = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            var crs = JSON.parse(localStorage.getItem("courses"));
            try {
                dispatch({
                    type: addDataToCart,
                    data: [...crs]
                })
            }
            catch (e) {
                localStorage.removeItem("courses");
            }
        })
    }
}
export const removeCourse = (id) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            var user = JSON.parse(localStorage.getItem("user"));
            var crs = JSON.parse(localStorage.getItem("courses"));
            var elementPos = getState().cart.courseCart.map(function (x) {
                return x.id;
            }).indexOf(id);
            if (user) {
                cartservice.deletecartitem(user.user[0].userid, id)
                    .then((res) => {
                        dispatch({
                            type: DeleteCartdata,
                            pos: elementPos
                        })
                    })
            }
            else {
                if (crs) {
                    try {
                        crs.splice(elementPos, 1)
                        localStorage.setItem("courses", JSON.stringify(crs));
                        dispatch({
                            type: DeleteCartdata,
                            pos: elementPos
                        })
                    }
                    catch (e) {
                        localStorage.removeItem("courses");
                    }
                }
            }
        })
    }
}
