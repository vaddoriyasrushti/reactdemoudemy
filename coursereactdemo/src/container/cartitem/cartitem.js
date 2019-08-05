import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as cartAction from '../../action/cart';
import './cartitem.css'
import { url } from '../../url'


const Cartitem = (props) => {

    const callcart = () => {
        props.history.push('/cart')
    }

    return (
        <div className="carthoveritem">
            <div><b>CART</b></div><hr />
            {
                props.cart.courseCart.length === 0 ?
                    <div className="emptycart">Your Cart is empty</div>
                    :
                    <div>
                        <div className="cartcontent">
                            {props.cart.courseCart.map((item, i) => [
                                <div key={i} className="flexcss">
                                    <div><img className="img-border" alt="course symbol" src={`${url}/images/thumbnailImages/${item.topicimage}`}></img></div>
                                    <div className="set-cartdetail">
                                        <div className="item-description">{item.description}</div>
                                        <div>Author : {item.author}</div>
                                    </div>
                                    <div className="price-class">₹{item.price}</div>
                                </div>,
                                <hr key={`${i}_`} />
                            ])}
                        </div>
                        <div className="footercart">
                            <Button type="primary" onClick={callcart}>View Cart</Button>
                            <div className="footer-price"><b>Total Price :</b><b className="color-red">₹{props.cart.courseCart.reduce(function (prev, cur) {
                                return prev + cur.price;
                            }, 0)}</b></div>
                        </div>
                    </div>
            }
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Cartitem);

