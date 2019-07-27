import React, { Component } from 'react'
import { Icon } from 'antd';
import { Button } from 'reactstrap'
import './coursehoveritem.css'

class Coursehover extends Component {

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
                <div><Button color="danger" block>Add To Cart</Button></div>
            </div>
        );
    }
}


export default Coursehover