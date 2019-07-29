import React, { Component } from 'react'
import { Icon } from 'antd';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as cartAction from '../../action/cart';
import './coursehoveritem.css'

class Coursehover extends Component {
    addtocart=(x)=>{
        console.log("x",x);
        console.log("action",this.props.action.cart)
        this.props.action.cart.addCourse(x)
    }
    render() {
        return (
            <div className="course-hover-item">
                <div className="mb-2">Last Updated : {this.props.detail.updatedAt}</div>
                <h5>{this.props.detail.description}</h5>
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
                
                <div><Button color="danger" block onClick={()=>{this.addtocart(this.props.detail)}}>Add To Cart</Button></div>
                <div><Button color="danger" block onClick={()=>{this.addtocart(this.props.detail)}}>Add To Cart</Button></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return (
      {
        // showsubcatbyname: state.subcategories.subcatbyname,
        // route:state.route.pathname
        cart:state.cart
      }
    );
  }

const mapDispatchToProps = (dispatch) => ({
    action: {
      cart: bindActionCreators(cartAction, dispatch),
      // route:bindActionCreators(routeAction,dispatch)
    }
  })
export default connect(mapStateToProps,mapDispatchToProps)(Coursehover);

