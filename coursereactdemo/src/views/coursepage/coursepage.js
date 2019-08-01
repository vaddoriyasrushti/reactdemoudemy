import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
// import { Link, Route, Switch } from 'react-router-dom';
import { Layout, Tabs } from 'antd';
import * as SUbCategoriesAction from '../../action/subcategories'
import '../slidingtab/slidingtab.css'
import { Row, Col } from 'antd';
import Card from '../card/card';
import Filter from '../filter/filter';
// import * as routeAction from '../../action/route'
// import { withRouter } from "react-router-dom";

const { Content } = Layout;
const { TabPane } = Tabs;

class Coursepage extends Component {
  xyz = {
    display: "flex"
  }
  constructor(props) {
    super(props);
    this.state = {
      mode: 'top',
      key: this.props.match.params.coursename
    };
  }

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
    this.setState({
      key: this.props.match.params.coursename
    })
  }
  componentWillMount() {
    this.props.action.subcategories.FetchsubcatbynameAction(this.props.match.params.coursename)
  }
  filteredList() {
    const value = this.state.key.toLowerCase();
    return this.props.showsubcatbyname.filter(function (
      customer
    ) {
      return (
        customer.allsubtosub.toLowerCase().indexOf(value) > -1 ||
        customer.catname.toLowerCase().indexOf(value) > -1
      );
    });
  }
  getsubtosubcategories = () => {
    var subtosubcat = [this.props.match.params.coursename];
    this.props.showsubcatbyname.map((subcat) => {
      var index = subtosubcat.indexOf(subcat.allsubtosub)
      if (index === -1) {
        subtosubcat.push(subcat.allsubtosub)
      }
    })
    return subtosubcat
  }
  render() {
    const { mode } = this.state;
    let callback = (key) => {
      this.setState({
        key: key
      })
    }
    return (
      <div style={{ margin: '5px 24px' }}>
        <Tabs defaultActiveKey={this.props.match.params.coursename} onChange={callback} tabPosition={mode} style={{ height: 'auto' }}>
          {this.getsubtosubcategories().map(i => (
            <TabPane tab={i.toUpperCase()} key={i}>
              <Content >
                <div style={this.courseheader}>{this.state.key}</div>
                <div style={{ paddingBottom: '30px' }} />
              </Content>
              <div style={{ dispaly: 'flex' }}  >
                {this.filteredList().length === 0 ?
                  <div className="Nodataavilable">No Any Courses Avilable</div> :
                  <div className="gutter-example">
                    <Row gutter={16} >
                      {this.filteredList().map((subcat, i) => [
                        <Col className="gutter-row" span={6} key={i}>
                          <div className="gutter-box" key={i}> <Card details={subcat} {...this.props} /></div>
                        </Col>
                      ])}
                    </Row>
                    <Filter {...this.props}></Filter>
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
      showsubcatbyname: state.subcategories.subcatbyname,
    }
  );
}

const mapDispatchToProps = (dispatch) => ({
  action: {
    subcategories: bindActionCreators(SUbCategoriesAction, dispatch),
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Coursepage);

