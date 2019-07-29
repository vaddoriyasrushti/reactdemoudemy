import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
// import { Link, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import * as SUbCategoriesAction from '../../action/subcategories'
import '../slidingtab/slidingtab.css'
import { Row, Col } from 'antd';
import Card from '../card/card';
// import * as routeAction from '../../action/route'
// import { withRouter } from "react-router-dom";

const { Content } = Layout;

class Coursepage extends Component {
    courseheader = {
        padding: 12,
        background: '#fff',
        minHeight: '65px',
        fontSize: '25px',
        fontWeight: 500,
    }
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        this.onRouteChanged();
      }
    }
    onRouteChanged() {
      this.props.action.subcategories.FetchsubcatbynameAction(this.props.match.params.coursename)
    }
    componentWillMount() {
      console.log("DSCDS",this.props)
      this.props.action.subcategories.FetchsubcatbynameAction(this.props.match.params.coursename)
    }
    render() {
        return (
            <div style={{ margin: '24px' }}>
            <Content >
                <div style={this.courseheader}>{this.props.match.params.coursename}</div>
                <div style={{ paddingBottom: '30px' }} />
            </Content>
            <div style={{dispaly:'flex'}}  >
                <div className="gutter-example">
                    <Row gutter={16} >
                    {this.props.showsubcatbyname.map((subcat, i) => [
                      <Col className="gutter-row" span={6} key={i}>
                        <div className="gutter-box" key={i}> <Card details={subcat} {...this.props} /></div>
                      </Col>
                ])}
                 </Row>
                  </div>
              </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return (
      {
        showsubcatbyname: state.subcategories.subcatbyname,
        // route:state.route.pathname
      }
    );
  }

const mapDispatchToProps = (dispatch) => ({
    action: {
      subcategories: bindActionCreators(SUbCategoriesAction, dispatch),
      // route:bindActionCreators(routeAction,dispatch)
    }
  })
export default connect(mapStateToProps,mapDispatchToProps)(Coursepage);

