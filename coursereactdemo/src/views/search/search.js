import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Layout,Row, Col } from 'antd';
import * as SUbCategoriesAction from '../../action/subcategories'
import '../slidingtab/slidingtab.css'
import {  } from 'antd';
import Card from '../card/card';
import './search.css';
const { Content } = Layout;

class Search extends Component {
  componentWillMount() {
    this.props.action.subcategories.FetchAllsubcatAction()
  }
  filteredList() {
    const value = this.props.match.params.searchtitle.toLowerCase().trim();
    return this.props.Allsubcat.filter(function (customer) {
      return (
        customer.populartopic.toLowerCase().indexOf(value) > -1 ||
        customer.allsubtosub.toLowerCase().indexOf(value) > -1 ||
        customer.description.toLowerCase().indexOf(value) > -1 ||
        customer.author.toLowerCase().indexOf(value) > -1 ||
        customer.catname.toLowerCase().indexOf(value) > -1
      );
    });
  }
  render() {
    return (
      <div style={{ margin: '24px' }}>
        <Content >
          <div className="courseheader">Result for {this.props.match.params.searchtitle}</div>
          <div style={{ paddingBottom: '30px' }} />
        </Content>
        <div style={{ dispaly: 'flex' }}  >
          {this.filteredList().length===0?
          <div className="color">
            <b>
              <div
                style={{fontSize:25,textAlign:'center'}}
              >Sorry, we couldn't find any results for "{ this.props.match.params.searchtitle }"</div>
            </b>
            <div style={{fontSize:20,textAlign:'center'}}>
              Try adjusting your search. Here are some ideas:
              <div style={{fontSize:15,textAlign:'left',paddingLeft:500}}>
                <ul>
                  <li>Make sure all words are spelled correctly.</li>
                  <li>Try different search terms.</li>
                  <li>Try more general search terms.</li>
                </ul>
              </div>
            </div>
          </div>:
            <div className="gutter-example">
            <Row gutter={16} >
              {this.filteredList().map((subcat, i) => [
                <Col className="gutter-row" span={6} key={i}>
                  <div className="gutter-box" key={i}> <Card details={subcat} {...this.props} /></div>
                </Col>
              ])}
            </Row>
          </div>
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return (
    {
      Allsubcat: state.subcategories.allcourses,
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
export default connect(mapStateToProps, mapDispatchToProps)(Search);

