import { FetchCartitemofuser, InvalidData, DeleteCartdata, PostCartItem, addDataToCart } from "../reducer/cart";
import * as cartservice from '../service/cart'
import * as service from '../service/service'

export const postCartitemAction = (data) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            cartservice.postcartitem(data).then((res) => {
                console.log("X", res)
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
            cartservice.getcartitembyuserid(userid).then((res) => {
                if (res) {
                    var x = []
                    Promise.all([res.data.map((item) => {
                        service.fetchsubcategoriesbyid(item.catid).then((res) => {
                            x.push(res.data[0])
                        })
                        console.log("1")
                    }),
                    console.log("SDcsdcfsd"),
                    dispatch({  
                        type: FetchCartitemofuser,
                        data: x
                    })
                    ])
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
            var x = {
                userid: user.user[0].userid,
                catid: data.id
            }
            dispatch(postCartitemAction(x))
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
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let course = []
            var x = 0;
            var user = JSON.parse(localStorage.getItem("user"));
            var crs = JSON.parse(localStorage.getItem("courses"));
            if (user) {
                var x = {
                    userid: user.user[0].userid,
                    catid: i.id
                }
                dispatch(postCartitemAction(x))
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
                if (x == 1) {
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
                cartservice.deletecartitem(user.user[0].userid,id).then((res) => {
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


// addCourse(
//     dispatch
//   }, i) {
//     var user = JSON.parse(localStorage.getItem("user"));
//     var crs = JSON.parse(localStorage.getItem("courses"));

//     if (user) {
//       this.state.cartitem.push(i.id)
//       //  this.state.cartitem=this.state.cartitem
//       let data = {
//         userid: user.userid,
//         catid: i.id
//       };
//       dispatch("cart", data);
//       // this.state.cartitem.push(i.id)
//       if (this.state.selectedcourse == null) {
//         this.state.selectedcourse = [];
//       } else {

//         var elementPos = this.state.selectedcourse.map(function (x) {
//           return x.id;
//         }).indexOf(i.id);

//         if (elementPos == -1) {
//           // this.state.cartitem.push(i.id)
//           this.state.selectedcourse.push(i);
//         }
//       }
//     } else {

//       if (crs == null) {
//         this.state.selectedcourse = [];
//       }
//       if (crs) {
//         try {
//           this.state.selectedcourse = crs;
//         } catch (e) {
//           localStorage.removeItem("courses");
//         }
//         var allitems = JSON.parse(localStorage["courses"]);
//         for (var j = 0; j < allitems.length; j++) {
//           if (allitems[j].id == i.id) {
//             return;
//           }
//         }
//       }
//       var x = {
//         id: i.id,
//         populartopic: i.populartopic,
//         author: i.author,
//         price: i.price,
//         description: i.description,
//         topicimage: i.topicimage,
//         catname: i.catname
//       };

//       this.state.selectedcourse.push(x);
//       this.state.cartitem.push(x.id)
//       dispatch("saveCourses");
//       this.state.total.push(i.price);
//     }
//   },
//   saveCourses({
//     commit
//   }) {
//     const parsed = JSON.stringify(this.state.selectedcourse);
//     localStorage.setItem("courses", parsed);
//     this.state.counter = JSON.parse(localStorage.getItem("courses")) ?
//       JSON.parse(localStorage.getItem("courses")).length :
//       0;
//   },
//   cart({
//     commit
//   }, data) {
//     cartservice
//       .postcartitem(data)
//       .then(res => {
//         this.state.cartitem.push(data.catid)
//         this.state.counter = this.state.counter + 1;
//       })
//       .catch(err => console.log(err));
//   },