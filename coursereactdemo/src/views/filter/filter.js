import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Layout, Button, Checkbox } from 'antd';
import * as SUbCategoriesAction from '../../action/subcategories'
import '../../container/slidingtab/slidingtab.css'
import { Row, Icon, Select } from 'antd';
import './filter.css';
import Horizontalcard from '../../container/horizontalcard/horizonatalcard';
var orderBy = require('lodash.orderby');

const { Option } = Select;
const { Content } = Layout;

class Filter extends Component {
    state = {
        selectedsort: null,
        showbuttons: true,
        selected: [], // Must be an array reference!
        prices1: [
            { label: "0-300", value: "0-300" },
            { label: "301-500", value: "301-500" },
            { label: "501-700", value: "501-700" },
            { label: "700 up", value: "700up" }
        ],
        filtersAsNumbers: {
            "0-300": [0, 300],
            "301-500": [301, 500],
            "501-700": [501, 700],
            "700up": [700, 1000000]
        }
    }
    componentWillMount() {
        this.props.action.subcategories.FetchsubcatbynameAction(this.props.match.params.coursename)
    }
    onChange = (checkedValues) => {
        this.setState({ selected: checkedValues })
    }
    setshowbutton = () => {
        this.setState({ showbuttons: false })
    }
    applyclickhandler = () => {
        this.setState({ showbuttons: true })
    }
    cancelclickhandler = () => {
        this.setState({ showbuttons: true, selected: [] })
    }
    closeclickhandler = (i) => {
        this.state.selected.splice(i, 1)
        this.setState({ selected: this.state.selected })
    }
    clearallclickhandler = () => {
        this.setState({ selected: [] })
    }
    filterandsorting() {
        var x = this.filteredProducts();
        if (this.state.selectedsort === "a") {
            return orderBy(x, "price");
        } else if (this.state.selectedsort === "b") {
            return orderBy(x, "price", "desc");
        } else {
            return x;
        }
    }
    ondropdownClick = (value) => {
        this.setState({ selectedsort: value })
    };
    filteredProducts() {
        return this.props.showsubcatbyname.filter(product => {
            if (this.state.selected.length < 1) {
                return product;
            } else {
                var productReturn;
                Object.keys(this.state.filtersAsNumbers)
                    .filter(priceRange => this.state.selected.includes(priceRange))
                    .filter(priceRangeFiltered => {
                        let low = this.state.filtersAsNumbers[priceRangeFiltered][0];
                        let high = this.state.filtersAsNumbers[priceRangeFiltered][1];
                        if (product.price >= low && product.price <= high) {
                            productReturn = product;
                        }
                    });
                return productReturn;
            }
        });
    }
    render() {
        return (
            <div className="topmargin">
                <h3>All {this.props.match.params.coursename} Courses</h3>
                <Content className="contentmargin" >
                    <div className="course-header">
                        {this.state.showbuttons ? <Button size='large' onClick={this.setshowbutton}>Filter</Button> : null}
                        {this.state.showbuttons ?
                            <div>
                                {this.state.selected.map((item, i) => (
                                    <Button size='large' key={i} onClick={() => this.closeclickhandler(i)}>{item}<Icon type="close" /></Button>
                                ))}
                                {this.state.selected.length > 1 ? <Button size='large' onClick={this.clearallclickhandler}>Clear All</Button> : null}

                            </div> : null
                        }
                        {!this.state.showbuttons ?
                            <div>
                                <Button size='large' className="applybutton" onClick={this.applyclickhandler}>APPLY</Button>&nbsp;&nbsp;
                                <Button size='large' onClick={this.cancelclickhandler}>CANCEL</Button>
                                <div><br />
                                    <span><b>Price : </b></span><Checkbox.Group options={this.state.prices1} onChange={this.onChange} /><br />
                                </div>
                            </div> : null
                        }
                    </div>
                </Content>
                <b>Sort</b> : <Select
                    className="sortselect"
                    placeholder="Select a order"
                    onChange={this.ondropdownClick}
                >
                    <Option value="null">Select a order</Option>
                    <Option value="a">Lowest to Highest Price</Option>
                    <Option value="b">Highest to Lowest Price</Option>
                </Select>
                <div className="sortcontent" >
                    <div className="gutter-example">
                        <Row gutter={16} >
                            {this.filterandsorting().map((subcat, i) => [
                                <div className="gutterbox" key={i}> <Horizontalcard details={subcat} {...this.props} /></div>
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
        }
    );
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        subcategories: bindActionCreators(SUbCategoriesAction, dispatch),
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Filter);

