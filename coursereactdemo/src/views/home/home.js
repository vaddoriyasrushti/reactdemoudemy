import React, { Component } from 'react';
import Carouselcomp from '../carousel/carousel';
import Slidingtabs from '../slidingtab/slidingtab'
import { Layout } from 'antd';
import './home.css'

const { Content } = Layout;
class Home extends Component {
    
    render() {
        return (
            <Content style={{ margin: '24px' }}>
                <div className="courseheader"> Courses</div>
                <div style={{ paddingBottom: '30px' }} />
                <Carouselcomp />
                <div style={{ paddingBottom: '30px' }} />
                <div className="courseheader">
                    <Slidingtabs  {...this.props}/>
                </div>
            </Content>
        );
    }
}


export default Home
