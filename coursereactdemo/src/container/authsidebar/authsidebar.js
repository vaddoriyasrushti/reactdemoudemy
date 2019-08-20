import React from 'react'
import { Row, Col } from 'antd';
import backgroundimage from '../../assets/back4.jpg'
import user3 from '../../assets/user-3.jpg'
import { Avatar } from 'antd';
import Registartion from '../../views/registration/registration';
import Login from '../../views/login/login';
import './authsidebar.css'

const Authsidebar = (props) => {
    return (
        <div className="headermargin">
            <Row>
                <Col span={16} push={8} className="content-auth">
                    {props.location.pathname === '/signup' ? <Registartion {...props} /> : null}
                    {props.location.pathname === '/login' ? <Login {...props} /> : null}
                </Col>
                <Col className="background-class" span={8} pull={16} style={{ backgroundImage: "url(" + backgroundimage + ")" }}>
                    <div className="color-overimage" />
                    <div className="slider-left">
                        <Avatar size={150} className="borderavtar" src={user3} />
                        <div>
                            <h5 className="mt-2 author" >Astell Mercell</h5>
                            <div className="profession">Director of Brand Development at Quartz</div><br />
                            <p className="descriptionblock">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}


export default Authsidebar