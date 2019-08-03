import React from 'react'
import { Card, Rate, Popover } from 'antd';
import './card.css'
import Coursehover from '../coursehover/coursehoveritem'
import {url} from '../../url'

const CardDemo = (props) => {
    const coursedetailroute = () => {
        props.history.push({ pathname: `/course/${props.details.catname}/${props.details.populartopic}`, state: { id: props.details.id } })
    }
    const content = (
        <Coursehover detail={props.details} />
    );
    return (
        <div>
            <Popover placement="right" content={content}>
                <Card key={props.details.id}
                    onClick={coursedetailroute}
                    hoverable
                    className="card-width"
                    cover={<img alt="example" height='170px' src={url+'/images/' + props.details.topicimage} />}
                >
                    <div className="make-ellipse description" >{props.details.description}</div>
                    <div className="mb-2">For : {props.details.allsubtosub}</div>
                    <div className="fs-14 mb-2">{props.details.author}</div>
                    <Rate allowHalf defaultValue={2.5} />
                    <div className="price"><h5 color="primary">₹{props.details.price}</h5></div>
                </Card>
            </Popover>
        </div>
    );
}
export default CardDemo