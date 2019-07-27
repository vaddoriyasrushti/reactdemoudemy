import React, { Component } from 'react';
import Carouselcomp from '../carousel/carousel';
import Slidingtabs from '../slidingtab/slidingtab'
import { Layout } from 'antd';
const { Content } = Layout;

class Home extends Component {
    courseheader = {
        padding: 12,
        background: '#fff',
        minHeight: '65px',
        fontSize: '25px',
        fontWeight: 500,
    }
    render() {
        return (
            <Content style={{ margin: '24px' }}>
                <div style={this.courseheader}> Courses</div>
                <div style={{ paddingBottom: '30px' }} />
                <Carouselcomp />
                <div style={{ paddingBottom: '30px' }} />
                <div style={this.courseheader}>
                    <Slidingtabs  {...this.props}/>
                </div>
            </Content>
        );
    }
}


export default Home
