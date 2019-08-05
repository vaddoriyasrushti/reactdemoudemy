import React from 'react'
import { Icon } from 'antd';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as cartAction from '../../action/cart';
import './coursehoveritem.css'

const Coursehover = (props) => {
  const addtocart = (x) => {
    props.action.cart.addCourse(x)
  }
  const callcart = () => {
    props.history.push('/cart')
}
  return (
    <div className="course-hover-item">
      <div className="mb-2">Last Updated : {props.detail.updatedAt}</div>
      <h5>{props.detail.description}</h5>
      <div className="mb-2"><Icon type="play-circle" theme="filled" /><span>    483 lectures  </span>
        <Icon type="clock-circle" /><span> 11.5 hours  </span>
        <Icon type="stock" /><span> All Levels </span>
      </div>
      <span className="mb-5">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical.</span>
      <ul>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        <li>Vivamus non ipsum in nisi porttitor suscipit.</li>
        <li>Aliquam ut dolor in lorem accumsan porta.</li>
      </ul>
      {
        props.cart.courseCart.some(el => el.id === props.detail.id) ? <div><Button color="danger" block onClick={() => { callcart() }}>Go To Cart</Button></div> :
          <div><Button color="danger" block onClick={() => { addtocart(props.detail) }}>Add To Cart</Button></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Coursehover);

