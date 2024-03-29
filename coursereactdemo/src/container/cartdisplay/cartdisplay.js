import React, { useEffect } from 'react';
import { Layout, Icon } from 'antd';
import { connect } from 'react-redux';
import './cartdisplay.css';
import { bindActionCreators } from "redux";
import { Table, Button } from 'reactstrap';
import * as cartAction from '../../action/cart';
import { url } from '../../url';
import Paypal from '../../views/dropdownbutton'

const { Content } = Layout;

const Cartdisplay = (props) => {
    useEffect(() => {
        if (localStorage.getItem("courses")) {
            props.action.cart.addstoragetoredux();
        }
        if (localStorage.getItem("user")) {
            var user = JSON.parse(localStorage.getItem("user"))
            props.action.cart.getCartitembyuseridAction(user.user[0].userid)
        }
    }, []);
    const checkout = () => {
        props.history.push('/login')
    }
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
                                    <th className="centerheader">Image</th>
                                    <th className="paddingcontent">Description</th>
                                    <th>Author</th>
                                    <th className="paddingprice">price</th>
                                    <th className="centerheader">remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.cart.courseCart.map((item, i) => [
                                    <tr key={i}>
                                        <th scope="row">{++i}</th>
                                        <td className="centerheader"><img alt="example" height='70px' width="100px" src={url + '/images/' + item.topicimage} /></td>
                                        <td className="paddingcontent">{item.description}</td>
                                        <td>{item.author}</td>
                                        <td className="paddingprice">₹{item.price}</td>
                                        <td className="centerremove" onClick={() => removeCourse(item.id)}><Icon type="close-circle" /></td>
                                    </tr>
                                ])}
                                <tr>
                                    <th scope="row"></th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><b>Total Price : ₹{props.cart.courseCart.reduce(function (prev, cur) {
                                        return prev + cur.price;
                                    }, 0)}</b></td>
                                    <td>
                                        {localStorage.getItem('user') ? <Paypal {...props} /> :
                                            <Button color="danger" onClick={checkout}>Check Out</Button>
                                        }
                                    </td>
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
