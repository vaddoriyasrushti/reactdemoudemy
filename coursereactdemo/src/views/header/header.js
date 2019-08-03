import React, { Component } from 'react'
import './header.css'
import reactimg from '../../assets/react.png'
import { Layout, Menu, Icon, Avatar, Popover, Badge } from 'antd';
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Link, Route, Switch } from 'react-router-dom';
import Signup from '../../container/authsidebar/authsidebar';
import Home from '../../container/home/home';
import * as registerAction from '../../action/auth';
import Coursedetail from '../../container/coursedetail/coursedetail';
import Coursepage from '../coursepage/coursepage';
import * as CategoriesAction from '../../action/categories'
import * as SUbCategoriesAction from '../../action/subcategories'
import * as cartAction from '../../action/cart';
import Cartitem from '../../container/cartitem/cartitem'
import cartdisplay from '../../container/cartdisplay/cartdisplay';
import Searchpage from '../../container/search/search';
import { Input } from 'antd';

const { Search } = Input;
const { Header, Sider } = Layout;

class SideNavbar extends Component {
    state = {
        collapsed: false,
        catname:'development',
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    logout = () => {
        this.props.action.register.logoutUser()
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
    routecategory(catname) {
        this.props.history.push(`/course/${catname}`)
        //  this.props.history.push({pathname:`/course/${catname}`,state: { coursename: catname }})
    }
    routecourse = () => {
        this.props.history.push('/')
    }
    callcart = () => {
        this.props.history.push('/cart')
    }
    routesearch = (searchtitle) => {
        this.props.history.push(`/search/${searchtitle}`)
    }
    setsubcat = (catname)=>{
        this.setState({catname:catname})
    }
    getsubtosubcategories = () => {
        var subtosubcat = [];
        console.log("catname",this.state.catname)
        this.props.Allsubcat.filter((item)=>{ console.log(item.catname,"Fvvfd",this.state.catname.toLowerCase()); return(item.catname.toLowerCase()===this.state.catname.toLowerCase())})
         .map((subcat) => {
          var index = subtosubcat.indexOf(subcat.allsubtosub)
          if (index === -1) {
            subtosubcat.push(subcat.allsubtosub)
          }
        })
        console.log("subcat",subtosubcat)
        return subtosubcat
      }
    render() {
        const content2 = (
            <div className="category-point">
                {this.getsubtosubcategories().map((value, index) => {
                    return [
                        <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }} key={index} onClick={() => this.routecategory(value)}>
                            <span style={{width:150}}>{value}</span>
                            <Popover content={content2}><i className="material-icons" style={{right:0}}>keyboard_arrow_right</i></Popover>
                        </div>,]
                })}
            </div>
        );
        const content = (
            <div className="category-point">
                {this.props.showcat.map((value, index) => {
                    return [
                        <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }} key={index} onClick={() => this.routecategory(value.categoriesname)}>
                            <i className="material-icons">{value.categoriesicon}</i><span style={{width:150}}>{value.categoriesname}</span>
                            <Popover content={content2}><i className="material-icons" style={{right:0}} onMouseOver={()=>{this.setsubcat(value.categoriesname)}}>keyboard_arrow_right</i></Popover>
                        </div>,]
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
                            {!this.props.auth.token ? [<Button key="signup" color="danger" className="mr-2" tag={Link} to='/signup'>SignUp</Button>,
                            <Button key="login" color="danger" tag={Link} to='/login'>Login</Button>] :
                                <Button color="danger" onClick={this.logout}>Logout</Button>}
                        </div>
                    </Header>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Signup} />
                        <Route exact path="/course/:coursename" component={Coursepage} />
                        <Route exact path="/cart" component={cartdisplay} />
                        <Route exact path="/search/:searchtitle" component={Searchpage} />
                        <Route exact path="/course/:coursename/:topic" component={Coursedetail} {...this.props} />
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