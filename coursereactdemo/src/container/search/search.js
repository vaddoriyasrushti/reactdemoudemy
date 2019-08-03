import React,{useEffect} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Layout, Row, Col } from 'antd';
import * as SUbCategoriesAction from '../../action/subcategories'
import '../slidingtab/slidingtab.css'
import { } from 'antd';
import Card from '../card/card';
import './search.css';
const { Content } = Layout;

const Search = (props) => {
  useEffect(() => {
    props.action.subcategories.FetchAllsubcatAction()
  }, []);
  const filteredList = () => {
    const value = props.match.params.searchtitle.toLowerCase().trim();
    return props.Allsubcat.filter(function (customer) {
      return (
        customer.populartopic.toLowerCase().indexOf(value) > -1 ||
        customer.allsubtosub.toLowerCase().indexOf(value) > -1 ||
        customer.description.toLowerCase().indexOf(value) > -1 ||
        customer.author.toLowerCase().indexOf(value) > -1 ||
        customer.catname.toLowerCase().indexOf(value) > -1
      );
    });
  }

  return (
    <div className="margin-content">
      <Content >
        <div className="courseheader">Result for {props.match.params.searchtitle}</div>
        <div className="paddingbetween" />
      </Content>
      <div>
        {filteredList().length === 0 ?
          <div className="color">
            <b>
              <div
                className="noresultfound"
              >Sorry, we couldn't find any results for "{props.match.params.searchtitle}"</div>
            </b>
            <div className="noresultcontent">
              Try adjusting your search. Here are some ideas:
              <div className="wrap-ui">
                <ul>
                  <li>Make sure all words are spelled correctly.</li>
                  <li>Try different search terms.</li>
                  <li>Try more general search terms.</li>
                </ul>
              </div>
            </div>
          </div> :
          <div className="gutter-example">
            <Row gutter={16} >
              {filteredList().map((subcat, i) => [
                <Col className="gutter-row" span={6} key={i}>
                  <div className="gutter-box" key={i}> <Card details={subcat} {...props} /></div>
                </Col>
              ])}
            </Row>
          </div>
        }
      </div>
    </div>
  );

}
const mapStateToProps = (state) => {
  return (
    {
      Allsubcat: state.subcategories.allcourses,
    }
  );
}

const mapDispatchToProps = (dispatch) => ({
  action: {
    subcategories: bindActionCreators(SUbCategoriesAction, dispatch),
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Search);

