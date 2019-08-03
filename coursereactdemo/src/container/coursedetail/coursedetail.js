import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import './coursedetail.css';
import * as SUbCategoriesAction from '../../action/subcategories'
import { bindActionCreators } from "redux";
import {url} from '../../url'

const { Content } = Layout;

const Coursedetail = (props) => {
    const [details, setDetails] = useState([]);
    
    useEffect(() => {
        props.action.subcategories.FetchsubcatbyidAction(props.location.state.id).then(res => {
            setDetails(res.data[0])
          
        })
    }, []);
    return (
        <Content className="margin-content">
            <div className="courseheader">{props.match.params.topic}</div>
            <div className="paddingbetween"  />
            <div className="wrap-main-div">
                <div className="wrap-div">
                    <div className="divpadding">
                        <h3 className="color-white">Quisque hendrerit ex quis dui eleifend, dapibus vehicula lacus semper.</h3>
                        <h5 className="color-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h5>
                        <h5 className="color-white">2367532 students enrolled</h5>
                        <h5 className="color-white">Created By {details.author}, Girija Bansal by James Brown Last Updated 11/2018</h5>
                    </div>
                    <div  >
                        <video width="356" height="257" className="border-video"
                            src={url+'/images/'+ details.videos}
                            preload="auto"
                            controls
                        ></video>
                    </div>
                </div>
            </div>
            <div className="paddingbetween" />
        </Content>
    );
}

const mapStateToProps = (state) => {
    return (
        {
            showsubcatbyname: state.subcategories.subcatbyname,
        }
    );
}
const mapDispatchToProps = (dispatch) => ({
    action: {
        subcategories: bindActionCreators(SUbCategoriesAction, dispatch),
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Coursedetail);
