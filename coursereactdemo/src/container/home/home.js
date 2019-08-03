import React from 'react';
import Carouselcomp from '../../views/carousel/carousel';
import Slidingtabs from '../slidingtab/slidingtab'
import { Layout } from 'antd';
import './home.css'

const { Content } = Layout;
const Home = (props) => {
    return (
        <Content className="margin-content">
            <div className="courseheader"> Courses</div>
            <div className="paddingbetween" />
            <Carouselcomp />
            <div className="paddingbetween" />
            <div className="courseheader">
                <Slidingtabs  {...props} />
            </div>
        </Content>
    );
}

export default Home
