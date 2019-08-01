import React, { Component } from 'react'
import { Tabs } from 'antd';
import { Row, Col } from 'antd';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as CategoriesAction from '../../action/categories'
import * as SUbCategoriesAction from '../../action/subcategories'
import { bindActionCreators } from 'redux';
import Card from '../card/card'
import './slidingtab.css'


const { TabPane } = Tabs;

class SlidingTabsDemo extends Component {
  xyz = {
    display: "flex"
  }
  constructor(props) {
    super(props);
    this.state = {
      mode: 'top',
    };
  }


  componentWillMount() {
    this.props.action.categories.FetchCategoriesDataAction()
    console.log("sliding", this.props.location.pathname)
    if (this.props.location.pathname === '/') {
      this.props.action.subcategories.FetchsubcatbynameAction('development')
    }
  }


  render() {
    const { mode } = this.state;
    let callback = (key) => {
      console.log(key);
      this.props.action.subcategories.FetchsubcatbynameAction(key)
    }
    return (

      <div>
        <Tabs defaultActiveKey="development" onChange={callback} tabPosition={mode} style={{ height: 'auto' }}>
          {this.props.showcat.map(i => (
            <TabPane tab={i.categoriesname.toUpperCase()} key={i.categoriesname}>
              <div style={this.xyz} key={i} >
                {this.props.showsubcatbyname.length === 0 ?
                  <div className="Nodataavilable">No Any Courses Avilable</div> :
                  <div className="gutter-example" key={i}>
                    <Row gutter={16} key={i}>
                      {this.props.showsubcatbyname.map((subcat, i) => [
                        <Col className="gutter-row" span={6} key={i}>
                          <div className="gutter-box" key={i}> <Card details={subcat} {...this.props} /></div>
                        </Col>
                      ])}
                 </Row>
                  </div>
                }
                </div>
            </TabPane>
              ))}
        </Tabs>
      </div>
        );
      }
    }
    
const mapStateToProps = (state) => {
  return (
    {
            showcat: state.categories.categories,
          showsubcatbyname: state.subcategories.subcatbyname
          // cart: productlist.productCart
        }
      );
    }
    
const mapdispatchToProps = (dispatch) => ({
            action: {
            categories: bindActionCreators(CategoriesAction, dispatch),
          subcategories: bindActionCreators(SUbCategoriesAction, dispatch)
        }
      })
      export default connect(mapStateToProps, mapdispatchToProps)(SlidingTabsDemo);
