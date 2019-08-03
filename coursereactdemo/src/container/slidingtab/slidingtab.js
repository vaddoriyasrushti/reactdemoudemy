import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import { Row, Col } from 'antd';

import { connect } from 'react-redux'
import * as CategoriesAction from '../../action/categories'
import * as SUbCategoriesAction from '../../action/subcategories'
import { bindActionCreators } from 'redux';
import Card from '../card/card'
import './slidingtab.css'


const { TabPane } = Tabs;

const SlidingTabsDemo = (props) => {
  useEffect(() => {
    props.action.categories.FetchCategoriesDataAction()
    if (props.location.pathname === '/') {
      props.action.subcategories.FetchsubcatbynameAction('development')
    }
  }, []);

  let callback = (key) => {
    props.action.subcategories.FetchsubcatbynameAction(key)
  }
  return (
    <div>
      <Tabs defaultActiveKey="development" onChange={callback} tabPosition='top' className="tabsheight">
        {props.showcat.map(i => (
          <TabPane tab={i.categoriesname.toUpperCase()} key={i.categoriesname}>
            <div className="carddispaly" key={i} >
              {props.showsubcatbyname.length === 0 ?
                <div className="Nodataavilable">No Any Courses Avilable</div> :
                <div className="gutter-example" key={i}>
                  <Row gutter={16} key={i}>
                    {props.showsubcatbyname.map((subcat, i) => [
                      <Col className="gutter-row" span={6} key={i}>
                        <div className="gutter-box" key={i}> <Card details={subcat} {...props} /></div>
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

const mapStateToProps = (state) => {
  return (
    {
      showcat: state.categories.categories,
      showsubcatbyname: state.subcategories.subcatbyname
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
