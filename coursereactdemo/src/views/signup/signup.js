import React, { Component } from 'react'
import { Row, Col } from 'antd';
import backgroundimage from '../../assets/back4.jpg'
import user3 from '../../assets/user-3.jpg'
import { Avatar } from 'antd';
import Registartion from '../registration';
import Login from '../login';

class Signup extends Component {
   componentDidMount = () => {
       console.log(this.props);
   }
    render() {
        
        return (
            
            <div >
                 <Row>
                    <Col span={16} push={8} style={{minheight:'100vh',maxHeight: 'inherit'}}>
                       {this.props.location.pathname==='/signup'?<Registartion {...this.props}/>:null}
                       {this.props.location.pathname==='/login'?<Login {...this.props}/>:null}
                    </Col>
                    <Col className="background-class" span={8} pull={16} style={{backgroundImage: "url(" + backgroundimage + ")"}}>
                        <div style={{backgroundColor:'rgba(0,0,0,0.7)',display:'flex',height:'100vh'}}/>
                        <div style={{textAlign:'center',display:'inline-block',position:"absolute",left:'50%',top:'45%',transform:'translate(-50%,-50%)', color:'white',width:'80%'}}>
                        <Avatar size={150} style={{border:"5px solid white"}} src={user3} />
                        <div>
                        <h5 className="mt-2" style={{color:"white"}}>Astell Mercell</h5>
                        <div style={{fontSize:'18px'}}>Director of Brand Development at Quartz</div><br/>
                        <p style={{fontSize:'18px',textAlign:'justify'}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                        </div>
                       </div>
                    </Col> 
                </Row> 

            </div>
        );
    }
}


export default Signup