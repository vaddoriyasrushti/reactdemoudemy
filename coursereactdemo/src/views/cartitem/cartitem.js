import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as cartAction from '../../action/cart';
import './cartitem.css'


class Cartitem extends Component {
    msgTotal = this.props.cart.courseCart.reduce(function (prev, cur) {
        return prev + cur.price;
    }, 0);
    addtocart = (x) => {
        this.props.action.cart.addCourse(x)
    }
    callcart = () => {
        console.log("cart", this.props)
        this.props.history.push('/cart')
    }
    render() {
        return (
            <div style={{ minWidth: 350 }}>
                <div><b>CART</b></div><hr />
                {
                    this.props.cart.courseCart.length === 0 ?
                        <div className="emptycart">Your Cart is empty</div>
                        :
                        <div>
                            <div className="cartcontent">
                                {this.props.cart.courseCart.map((item, i) => [
                                    <div key={i} className="flexcss">
                                        <div><img className="img-border" alt="course symbol" src={`http://localhost:3003/images/thumbnailImages/${item.topicimage}`}></img></div>
                                        <div className="set-cartdetail">
                                            <div className="item-description">{item.description}</div>
                                            <div>Author : {item.author}</div>
                                        </div>
                                        <div style={{ color: 'red', paddingRight: 10 }}>₹{item.price}</div>
                                    </div>,
                                    <hr key={`${i}_`} />
                                ])}
                            </div>
                            <div className="footercart">
                                <Button type="primary" onClick={this.callcart}>View Cart</Button>
                                <div style={{ marginLeft: 'auto', paddingRight: 15 }}><b>Total Price :</b><b style={{ color: 'red' }}>₹{this.props.cart.courseCart.reduce(function (prev, cur) {
                                    return prev + cur.price;
                                }, 0)}</b></div>
                            </div>
                        </div>
                }
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Cartitem);

