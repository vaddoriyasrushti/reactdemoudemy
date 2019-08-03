import React, { useEffect } from 'react';
import { Layout, Icon } from 'antd';
import { connect } from 'react-redux';
import './cartdisplay.css';
import { bindActionCreators } from "redux";
import { Table, Button } from 'reactstrap';
import * as cartAction from '../../action/cart';
import {url} from '../../url'

const { Content } = Layout;

const Cartdisplay = (props) => {
    useEffect(() =>{
        if (localStorage.getItem("courses")) {
            props.action.cart.addstoragetoredux();
        }
        if (localStorage.getItem("user")) {
            var user = JSON.parse(localStorage.getItem("user"))
            console.log("check")
            props.action.cart.getCartitembyuseridAction(user.user[0].userid)
        }
    } , []);
   
    const removeCourse = (id) => {
        props.action.cart.removeCourse(id)
    }
    const redirecthome = () => {
        props.history.push('/')
    }

    return (
        <Content className="margin-content">
            <div className="courseheader">CART</div>
            <div className="paddingbetween" />
            <div className="content">
                {
                    props.cart.courseCart.length > 0 ?
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Author</th>
                                    <th>price</th>
                                    <th className="centerremoveheader">remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.cart.courseCart.map((item, i) => [
                                    console.log("itm", item),
                                    <tr key={i}>
                                        <th scope="row">{++i}</th>
                                        <td><img alt="example" height='70px' width="100px" src={url+'/images/' + item.topicimage} /></td>
                                        <td>{item.description}</td>
                                        <td>{item.author}</td>
                                        <td>₹{item.price}</td>
                                        <td className="centerremove" onClick={() => removeCourse(item.id)}><Icon type="close-circle" /></td>
                                    </tr>
                                ])}
                                <tr>
                                    <th scope="row"></th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>  Total Price : ₹{props.cart.courseCart.reduce(function (prev, cur) {
                                        return prev + cur.price;
                                    }, 0)}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table> : <div>
                            <center>
                                <div>Your cart is empty. Keep shopping to find a course!</div><br />
                                <Button color="danger" onClick={redirecthome} >Keep Shopping</Button>
                            </center>
                        </div>
                }
            </div>
        </Content>
    );
}

const mapStateToProps = (state) => {
    return (
        {
            cart: state.cart
        }
    );
}
const mapDispatchToProps = (dispatch) => ({
    action: {
        cart: bindActionCreators(cartAction, dispatch),
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Cartdisplay);
