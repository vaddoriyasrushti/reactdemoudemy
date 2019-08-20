import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Layout, Tabs } from 'antd';
import * as SUbCategoriesAction from '../../action/subcategories'
import '../../container/slidingtab/slidingtab.css'
// import { Row, Col } from 'antd';
import Card from '../../container/card/card';
import Filter from '../filter/filter';
import './coursepage.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const { Content } = Layout;
const { TabPane } = Tabs;

class Coursepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.match.params.coursename
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }
  onRouteChanged() {
    this.props.action.subcategories.FetchsubcatbynameAction(this.props.match.params.coursename)
    if (this.props.match.path === "/course/:coursename") {
      this.setState({
        key: this.props.match.params.coursename
      })
    }
    if (this.props.match.path === "/course/:coursename/:subcat") {
      this.setState({
        key: this.props.match.params.subcat
      })
    }
  }
  componentWillMount() {
    this.props.action.subcategories.FetchsubcatbynameAction(this.props.match.params.coursename)
    if (this.props.match.path === "/course/:coursename/:subcat") {
      this.setState({
        key: this.props.match.params.subcat
      })
    }
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
    let callback = (key) => {
      this.setState({
        key: key
      })
    }
    return (
      <div className="afterheader">
        <Tabs activeKey={this.state.key} onChange={callback} tabPosition='top' className="tabheight">
          {this.getsubtosubcategories().map(i => (
            <TabPane tab={i.toUpperCase()} key={i}>
              <Content >
                <div className="headercourse">{this.state.key}</div>
                <div className="paddingbetween" />
              </Content>
              <div>
                {this.filteredList().length === 0 ?
                  <div className="Nodataavilable">No Any Courses Avilable</div> :
                  <div className="gutter-example">
                    {/* <Row gutter={16} >
                      {this.filteredList().map((subcat, i) => [
                        <Col className="gutter-row" span={6} key={i}>
                          <div className="gutter-box" key={i}> <Card details={subcat} {...this.props} /></div>
                        </Col>
                      ])}
                    </Row> */}
                    <Carousel
                      additionalTransfrom={0}
                      arrows
                      autoPlaySpeed={0.5}
                      centerMode={false}
                      dotListClass=""
                      draggable
                      focusOnSelect={false}
                      infinite={false}
                      itemClass=""
                      keyBoardControl
                      minimumTouchDrag={80}
                      renderDotsOutside={false}
                      responsive={{
                        desktop: {
                          breakpoint: {
                            max: 3000,
                            min: 1024
                          },
                          items: 4,
                          paritialVisibilityGutter: 40
                        },
                        mobile: {
                          breakpoint: {
                            max: 464,
                            min: 0
                          },
                          items: 1,
                          paritialVisibilityGutter: 30
                        },
                        tablet: {
                          breakpoint: {
                            max: 1024,
                            min: 464
                          },
                          items: 2,
                          paritialVisibilityGutter: 30
                        }
                      }}
                      showDots={false}
                      sliderClass=""
                      slidesToSlide={1}
                      swipeable
                    >
                     {this.filteredList().map((subcat, i) => [
                     
                          <div key={i}> <Card details={subcat} {...this.props} /></div>
                      ])}
                      </Carousel>
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

