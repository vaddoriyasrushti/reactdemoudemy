import React, { Component } from 'react'
import './header.css'
import reactimg from '../../assets/react.png'
import { Layout, Menu, Icon, Avatar, Popover, Badge } from 'antd';
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as registerAction from '../../action/auth';
import * as CategoriesAction from '../../action/categories'
import * as SUbCategoriesAction from '../../action/subcategories'
import * as cartAction from '../../action/cart';
import Cartitem from '../../container/cartitem/cartitem'
import { Link } from 'react-router-dom';
import Router from '../../router/router';

import { Input } from 'antd';

const { Search } = Input;
const { Header, Sider } = Layout;

class SideNavbar extends Component {
    state = {
        collapsed: false,
        catname: 'development',
        subcat: 'Wev Development'
    }
    componentDidMount() {
        this.props.action.categories.FetchCategoriesDataAction();
        this.props.action.subcategories.FetchAllsubcatAction();
        if (localStorage.getItem("courses")) {
            this.props.action.cart.addstoragetoredux();
        }
        if (localStorage.getItem("user")) {
            var user = JSON.parse(localStorage.getItem("user"))
            this.props.action.cart.getCartitembyuseridAction(user.user[0].userid)
        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    logout = () => {
        this.props.action.register.logoutUser()
    }
    routecategory(catname) {
        this.props.history.push(`/course/${catname}`)
        //  this.props.history.push({pathname:`/course/${catname}`,state: { coursename: catname }})
    }
    routesubcategory(subcat) {
        this.props.history.push(`/course/${this.state.catname}/${subcat}`)
    }
    coursedetailroute = (topic, id) => {
        this.props.history.push({ pathname: `/course/${this.state.catname}/${this.state.subcat}/${topic}`, state: { id: id } })
    }
    routecourse = () => {
        this.props.history.push('/')
    }
    routechat = () => {
        this.props.history.push('/chat')
    }
    callcart = () => {
        this.props.history.push('/cart')
    }
    routesearch = (searchtitle) => {
        this.props.history.push(`/search/${searchtitle}`)
    }
    setsubcat = (catname) => {
        this.setState({ catname: catname })
    }
    setsubcat1 = (subcat) => {
        this.setState({ subcat: subcat })
    }
    getsubtosubcategories = () => {
        var subtosubcat = [];
        this.props.Allsubcat.filter((item) => { return (item.catname.toLowerCase() === this.state.catname.toLowerCase()) })
            .map((subcat) => {
                var index = subtosubcat.indexOf(subcat.allsubtosub)
                if (index === -1) {
                    subtosubcat.push(subcat.allsubtosub)
                }
            })
        return subtosubcat
    }
    getsubtosubcategories1 = () => {
        var subtosubcat = [];
        this.props.Allsubcat.filter((item) => { return (item.allsubtosub.toLowerCase() === this.state.subcat.toLowerCase()) })
            .map((subcat) => {
                let x = {
                    id: subcat.id,
                    topic: subcat.populartopic
                }
                subtosubcat.push(x)
            })
        return subtosubcat
    }
    teachonudemybuttonhandler = () => {
        this.props.history.push('/addcourse')
    }
    render() {
        const content3 = (
            <div className="category-point">
                {this.getsubtosubcategories1().map((value, index) => {
                    return [
                        <div className="headerpopover" key={index} onClick={() => { this.coursedetailroute(value.topic, value.id) }}>
                            <span style={{ width: 150 }}>{value.topic}</span>
                        </div>,]
                })}
            </div>
        );
        const content2 = (
            <div className="category-point">
                {this.getsubtosubcategories().map((value, index) => {
                    return [
                        <Popover placement="rightTop" content={content3} key={index}>
                            <div className="headerpopover" onMouseOver={() => { this.setsubcat1(value) }} >
                                <span style={{ width: 150 }} onClick={() => this.routesubcategory(value)}>{value}</span>
                                <i className="material-icons" >keyboard_arrow_right</i>
                            </div></Popover>,]
                })}
            </div>
        );
        const content = (
            <div className="category-point">
                {this.props.showcat.map((value, index) => {
                    return [
                        <Popover content={content2} placement="rightTop" key={index}>
                            <div className="headerpopover" onClick={() => this.routecategory(value.categoriesname)} onMouseOver={() => { this.setsubcat(value.categoriesname) }}>
                                <i className="material-icons">{value.categoriesicon}</i><span style={{ width: 150 }}>{value.categoriesname}</span>
                                <i className="material-icons" >keyboard_arrow_right</i>
                            </div></Popover>,]
                })}
            </div>
        );
        const cartitem = (
            <Cartitem {...this.props} />
        );
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} width="250px" className="sider" >
                    <div className="logo" onClick={this.routecourse}>
                        <Avatar shape="square" src={reactimg} />
                        {!this.state.collapsed ? <span className="pl-2">R E A C T</span> : null}
                    </div>
                    <div className="logo pt-2" >
                        <Avatar className="useravtar">{
                            this.props.auth.token ? JSON.parse(localStorage.getItem('user')).user[0].fullname.charAt(0).toUpperCase() : 'U'
                        }</Avatar>
                        {!this.state.collapsed ? <span key='1' className="pl-2">{
                            this.props.auth.token ? JSON.parse(localStorage.getItem('user')).user[0].fullname : 'User'
                        }</span> : null}
                    </div>
                    {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ backgroundColor: '#292d3d' }}> */}
                    <Menu theme="dark" mode="inline" className="menustyle">
                        <Menu.Item onClick={this.routecourse}>
                            <Icon type="book" />
                            <span>Courses</span>
                        </Menu.Item>
                        <Menu.Item onClick={this.routechat}>
                            <Icon type="book" />
                            <span>Chat</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className={this.state.collapsed ? "activeheader" : "header"} >
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <Popover content={content} placement="bottom">
                            <Icon
                                className="trigger"
                                type='appstore'
                            />
                        </Popover>
                        <Search placeholder="input search text" className="search" onSearch={value => value.trim() ? this.routesearch(value) : null} />
                        <div className='cart-logo-style'>
                            {localStorage.getItem('user') ?
                                <Button style={{ marginRight: 20 }} outline color="secondary" onClick={this.teachonudemybuttonhandler}>Teach On Udemy</Button> : null
                            }
                            <Popover content={cartitem} placement="bottomRight">
                                <span className="cartspan" onClick={this.callcart}>
                                    <Badge count={this.props.cart.courseCart.length}>
                                        <Icon
                                            className="carticon"
                                            type='shopping-cart'>
                                        </Icon>
                                    </Badge>
                                </span>
                            </Popover>
                            {!this.props.auth.token ? [
                                <Button key="signup" color="danger" className="mr-2" tag={Link} to='/signup'>SignUp</Button>,
                                <Button key="login" color="danger" tag={Link} to='/login'>Login</Button>
                            ] :
                                <Button color="danger" onClick={this.logout}>Logout</Button>}
                        </div>
                    </Header>
                    <Router {...this.props} />
                </Layout>
            </Layout >
        )
    }
}
const mapStateToProps = (state) => {
    const { categories } = state
    return (
        {
            showcat: categories.categories,
            auth: state.auth,
            cart: state.cart,
            Allsubcat: state.subcategories.allcourses,
        }
    );
}
const mapDispatchToProps = (dispatch) => ({
    action: {
        categories: bindActionCreators(CategoriesAction, dispatch),
        subcategories: bindActionCreators(SUbCategoriesAction, dispatch),
        cart: bindActionCreators(cartAction, dispatch),
        register: bindActionCreators(registerAction, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(SideNavbar);