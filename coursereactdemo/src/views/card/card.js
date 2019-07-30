import React, { Component } from 'react'
import { Card, Rate} from 'antd';
import './card.css'
import { Popover } from 'antd'
import Coursehover from '../coursehover/coursehoveritem'

class CardDemo extends Component {
    coursedetailroute = () => {
        console.log(this.props)
        this.props.history.push({pathname:`/course/${this.props.details.catname}/${this.props.details.populartopic}`,state:{id:this.props.details.id}})
      }
    render() {
        const content = (
         <Coursehover detail={this.props.details}/> 
        );
        return (
            <div>
                
                <Popover placement="right" content={content}>
                <Card key={this.props.details.id}
                    onClick={this.coursedetailroute}
                    hoverable
                    style={{ width: 300 }}
                    cover={<img alt="example" height='170px' src={'http://localhost:3003/images/'+ this.props.details.topicimage}/>}
                >
                    <div className="make-ellipse description" >{this.props.details.description}</div>
                    <div className="fs-14 mb-2">{this.props.details.author}</div>
                    <Rate allowHalf defaultValue={2.5} />
                    <div className="price"><h5 color="primary">₹{this.props.details.price}</h5><del>₹2000</del></div>
                 
                </Card>
                </Popover>
        </div>
        );
    }
}


export default CardDemo