import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import './coursedetail.css';
import * as SUbCategoriesAction from '../../action/subcategories';
import * as cartAction from '../../action/cart';
import { Button } from 'reactstrap';
import { bindActionCreators } from "redux";
import { url } from '../../url';

const { Content } = Layout;

const Coursedetail = (props) => {
    const [details, setDetails] = useState([]);
    useEffect(() => {
        props.action.subcategories.FetchsubcatbyidAction(props.location.state.id).then(res => {
            setDetails(res.data[0])
        })
    }, [props.location]);
    const addtocart = (x) => {
        props.action.cart.addCourse(x)
    }
    const callcart = () => {
        props.history.push('/cart')
    }
    return (
        <Content className="margin-content">
            <div className="courseheader">{props.match.params.topic}</div>
            <div className="paddingbetween" />
            <div className="wrap-main-div">
                <div className="wrap-div">
                    <div className="divpadding">
                        <h3 className="color-white">{details.populartopic}-{details.description}</h3>
                        <h5 className="color-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h5>
                        <h5 className="color-white">For : {details.allsubtosub}</h5>
                        <h5 className="color-white">Created By {details.author}</h5>
                        <h5 className="color-white">Last Updated {details.updatedAt}</h5>
                        <h5 className="color-white">Price : ₹{details.price}</h5>
                        {
                            props.cart.courseCart.some(el => el.id === props.location.state.id) ? <div><Button color="danger" onClick={() => { callcart() }}>Go To Cart</Button></div> :
                                <div><Button color="danger" onClick={() => { addtocart(details) }}>Add To Cart</Button></div>
                        }
                    </div>
                    <div>
                        <video width="356" height="250" className="border-video"
                            src={url + '/images/' + details.videos}
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
            cart: state.cart
        }
    );
}
const mapDispatchToProps = (dispatch) => ({
    action: {
        subcategories: bindActionCreators(SUbCategoriesAction, dispatch),
        cart: bindActionCreators(cartAction, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Coursedetail);
