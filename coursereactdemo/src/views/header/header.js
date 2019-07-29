import React, { Component } from 'react'
import './header.css'
import reactimg from '../../assets/react.png'
import { Layout, Menu, Icon, Avatar, Popover, Badge } from 'antd';
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Link, Route, Switch } from 'react-router-dom';
import Signup from '../signup/signup';
import Home from '../home/home';
import * as registerAction from '../../action/auth';
import Coursedetail from '../coursedetail/coursedetail';
import Coursepage from '../coursepage/coursepage';
import * as CategoriesAction from '../../action/categories'
import * as SUbCategoriesAction from '../../action/subcategories'
import * as cartAction from '../../action/cart';
// import { matchPath } from 'react-router'



const { Header, Sider } = Layout;

class SideNavbar extends Component {
    state = {
        collapsed: false,

    }
    // match = matchPath(this.props.history.location.pathname, {
    //     path: '/course/:coursename',
    //     exact: true,
    //     strict: false
    //   })

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    logout = () => {
        this.props.action.register.logoutUser()
    }
    componentDidMount() {
        console.log("cxdscdscds")
        this.props.action.categories.FetchCategoriesDataAction();
        if(localStorage.getItem("courses")){
        this.props.action.cart.addstoragetoredux();
    }
    }
    routecategory(catname) {
        this.props.history.push(`/course/${catname}`)
        //  this.props.history.push({pathname:`/course/${catname}`,state: { coursename: catname }})
    }
    render() {
        const content = (
            <div>
                {this.props.showcat.map((value, index) => {
                    return [
                        <div key={index} onClick={() => this.routecategory(value.categoriesname)}>{value.categoriesname}</div>,]
                })}
            </div>
        );
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} width="250px" style={{
                    backgroundColor: '#292d3d', minHeight: '100vh',
                    maxHeight: 'inherit',
                }}>
                    <div className="logo">
                        <Avatar shape="square" src={reactimg} />
                        {!this.state.collapsed ? <span className="pl-2">R E A C T</span> : null}
                    </div>
                    <div className="logo pt-2" >
                        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{
                            this.props.auth.token ? JSON.parse(localStorage.getItem('user')).user[0].fullname.charAt(0).toUpperCase() : 'U'
                        }</Avatar>
                        {!this.state.collapsed ? <span key='1' className="pl-2">{
                            this.props.auth.token ? JSON.parse(localStorage.getItem('user')).user[0].fullname : 'User'
                        }</span> : null}
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ backgroundColor: '#292d3d' }}>
                        <Menu.Item key="1">
                            <Icon type="book" />
                            <span>Courses</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <Popover content={content}>
                            <Icon
                                className="trigger"
                                type='appstore'
                            />
                        </Popover>
                        <div className='hello' style={{ float: 'right' ,marginRight:24}}>
                        <span style={{ marginRight: 24 }}>
                            <Badge count={this.props.cart.courseCart.length}>
                                <Icon
                                    style={{fontSize:'25px'}}
                                    className=""
                                    type='shopping-cart'>
                                </Icon>
                            </Badge>
                        </span>
                        {!this.props.auth.token ? [<Button key="signup" color="danger" className="mr-2" tag={Link} to='/signup'>SignUp</Button>,
                        <Button key="login" color="danger" tag={Link} to='/login'>Login</Button>] :
                            <Button  color="danger" onClick={this.logout}>Logout</Button>}
                        </div>
                    </Header>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Signup} />
                    <Route exact path="/course/:coursename/:topic" component={Coursedetail} {...this.props} />
                    <Route exact path="/course/:coursename" component={Coursepage} />
                    {/* <Route exact path="/course/:coursename" 
                        render={(routeProps) => ( <Coursepage xyz={routeProps} /> )}/> */}

                </Switch>
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
            cart: state.cart
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