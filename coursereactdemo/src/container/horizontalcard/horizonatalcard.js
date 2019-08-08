import React from 'react'
import { Rate ,Popover} from 'antd';
import Coursehover from '../coursehover/coursehoveritem'
import './horizontalcard.css'
import {url} from '../../url';

const CardDemo = (props) => {
    const coursedetailroute = () => {
        props.history.push({ pathname: `/course/${props.details.catname}/${props.details.allsubtosub}/${props.details.populartopic}`, state: { id: props.details.id } })
    }
    const content = (
        <Coursehover detail={props.details} />
    );
    return (
        <div>
            <div className="course-header">
                <Popover placement="bottom" content={content}>
                    <div className="flexcss" onClick={coursedetailroute}>
                        <div><img className="img-border" alt="course symbol" src={`${url}/images/${props.details.topicimage}`}></img></div>
                        <div className="setcartdetail">
                            <div className="itemdescription">{props.details.description}</div>
                            <div className="mb-2"><b>For</b> : {props.details.allsubtosub}</div>
                            <div className="fs-14 mb-2"><b>Author</b> : {props.details.author}</div>
                            <div>Learn {props.details.populartopic} like a Professional! Start from the basics and go all the way to creating your own applications and games!</div>
                        </div>
                        <div className="sideratingandprice"> <Rate allowHalf defaultValue={2.5} /><h5 color="primary">₹{props.details.price}</h5></div>
                    </div>
                </Popover>
            </div>
        </div>
    );
}

export default CardDemo