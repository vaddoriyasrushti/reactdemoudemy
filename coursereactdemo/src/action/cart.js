import { FetchCartdataofuser, InvalidData, DeleteCartdata, Postcartdata, addDataToCart } from "../reducer/cart";
import * as service from '../service/service'

// export const FetchAllsubcatAction = () => {
//     return (dispatch) => {
//         // return new Promise((resolve, reject) => {
//             service.fetchallsubcategories().then((res) => {
//                 if (res) {
//                     dispatch({
//                         type: FetchAllSubcategories,
//                         data: res.data
//                     });
//                 }
//                 // resolve(res)
//             })
//                 .catch((error) => {
//                     if (error.res) {
//                         dispatch({
//                             type: InvalidData,
//                             data: "Invalid Data"
//                         })
//                     }
//                 })
//         // })
//     }
// }
export const addDataToCartAction = (data) => {
    return (dispatch) => {
        let products = [];
        var user = JSON.parse(localStorage.getItem("user"));
        var crs = JSON.parse(localStorage.getItem("courses"));
        if (user) {

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
                //   this.state.cartitem.push(x.id)
                // dispatch(saveCourses(parsed))
                //   this.state.total.push(i.price);
            }
        })
    }
}
// export const saveCourses = (data) => {
//     // const parsed = JSON.stringify(getState);
//     // localStorage.setItem("courses", data);
//     // this.state.counter = JSON.parse(localStorage.getItem("courses")) ?
//     //   JSON.parse(localStorage.getItem("courses")).length :
//     //   0;

// }
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
// addCourse({
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