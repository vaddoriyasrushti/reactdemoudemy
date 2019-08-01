import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import { connect } from 'react-redux';
import './cartdisplay.css';
import { bindActionCreators } from "redux";
import { Table, Button } from 'reactstrap';
import * as cartAction from '../../action/cart';

const { Content } = Layout;

class Cartdisplay extends Component {
    componentDidMount() {
        if (localStorage.getItem("courses")) {
            this.props.action.cart.addstoragetoredux();
        }
        if (localStorage.getItem("user")) {
            var user = JSON.parse(localStorage.getItem("user"))
            console.log("check")
            this.props.action.cart.getCartitembyuseridAction(user.user[0].userid)
        }
    }
    removeCourse(id) {
        this.props.action.cart.removeCourse(id)
    }
    redirecthome = () => {
        this.props.history.push('/')
    }
    render() {
        return (
            <Content style={{ margin: '24px' }}>
                <div className="courseheader">CART</div>
                <div style={{ paddingBottom: '30px' }} />
                <div className="content">
                    {
                        this.props.cart.courseCart.length > 0 ?
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
                                    {this.props.cart.courseCart.map((item, i) => [
                                        console.log("itm", item),
                                        <tr key={i}>
                                            <th scope="row">{++i}</th>
                                            <td><img alt="example" height='70px' width="100px" src={'http://localhost:3003/images/' + item.topicimage} /></td>
                                            <td>{item.description}</td>
                                            <td>{item.author}</td>
                                            <td>₹{item.price}</td>
                                            <td className="centerremove" onClick={() => this.removeCourse(item.id)}><Icon type="close-circle" /></td>
                                        </tr>
                                    ])

                                    }

                                    <tr>
                                        <th scope="row"></th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>  Total Price : ₹{this.props.cart.courseCart.reduce(function (prev, cur) {
                                            return prev + cur.price;
                                        }, 0)}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table> : <div>
                                <center>
                                    <div>Your cart is empty. Keep shopping to find a course!</div><br />
                                    <Button color="danger" onClick={this.redirecthome} >Keep Shopping</Button>
                                </center>
                            </div>
                    }
                </div>

            </Content>
        );
    }
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
