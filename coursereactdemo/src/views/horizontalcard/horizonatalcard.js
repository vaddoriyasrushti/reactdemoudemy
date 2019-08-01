import React, { Component } from 'react'
import { Card, Rate } from 'antd';
import { Popover } from 'antd'
import Coursehover from '../coursehover/coursehoveritem'
import './horizontalcard.css'

class CardDemo extends Component {
    coursedetailroute = () => {
        console.log(this.props)
        this.props.history.push({ pathname: `/course/${this.props.details.catname}/${this.props.details.populartopic}`, state: { id: this.props.details.id } })
    }
    render() {
        const content = (
            <Coursehover detail={this.props.details} />
        );
        return (
            <div>
                <div className="course-header">
                <Popover placement="bottom" content={content}>
                    <div className="flexcss">
                        <div><img className="img-border" alt="course symbol" src={`http://localhost:3003/images/${this.props.details.topicimage}`}></img></div>
                        <div className="setcartdetail">
                            <div className="itemdescription">{this.props.details.description}</div>
                            <div className="mb-2"><b>For</b> : {this.props.details.allsubtosub}</div>
                            <div className="fs-14 mb-2"><b>Author</b> : {this.props.details.author}</div>
                            <div>Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!</div>
                        </div>
                        <div style={{ color: 'red', paddingRight: 10,width:400,textAlign:'right' }}> <Rate allowHalf defaultValue={2.5} /><h5 color="primary">₹{this.props.details.price}</h5></div>
                    </div>
                </Popover>
                </div>
            </div>
        );
    }
}

export default CardDemo