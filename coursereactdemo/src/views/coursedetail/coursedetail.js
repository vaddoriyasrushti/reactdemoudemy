import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import './coursedetail.css';
import * as SUbCategoriesAction from '../../action/subcategories'
import { bindActionCreators } from "redux";

const { Content } = Layout;

class Coursedetail extends Component {
    courseheader = {
        padding: 12,
        background: '#fff',
        minHeight: '65px',
        fontSize: '25px',
        fontWeight: 500,
    }
    state = {
        details: []
    }
    componentWillMount() {
        this.props.action.subcategories.FetchsubcatbyidAction(this.props.location.state.id).then(res => {
            this.setState({
                details: res.data[0]
            })
            console.log("cds", this.state.details)
            console.log("cdsxsaxa", `http://localhost:3003/images/${this.state.details.videos}`)
        }
        )


    }
    // componentDidMount(){
    //     console.log("details",this.props.detailsoftopic)
    // }
    render() {
        return (
            <Content style={{ margin: '24px' }}>
                <div style={this.courseheader}>{this.props.match.params.topic}</div>
                <div style={{ paddingBottom: '30px' }} />
                <div className="wrap-main-div">
                    <div className="wrap-div">
                        <div style={{ padding: '15px' }}>
                            <h3 className="color-white">Quisque hendrerit ex quis dui eleifend, dapibus vehicula lacus semper.</h3>
                            <h5 className="color-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h5>
                            <h5 className="color-white">2367532 students enrolled</h5>
                            <h5 className="color-white">Created By {this.state.details.author}, Girija Bansal by James Brown Last Updated 11/2018</h5>
                        </div>
                        <div  >
                            <video width="356" height="257" className="border-video"
                                src={'http://localhost:3003/images/' + this.state.details.videos}
                                preload="auto"
                                controls
                            ></video>
                            {/* <video width="356" height="257" className="border-video" controls>
                                <source src={'http://localhost:3003/images/'+ this.state.details.videos} type="video/mp4" />
                                <source src="movie.ogg" type="video/ogg" />
                                Your browser does not support the video tag.
                            </video> */}

                        </div>
                    </div>
                </div>
                <div style={{ paddingBottom: '30px' }} />
                <div style={this.courseheader}>

                </div>
            </Content>
        );
    }
}


const mapStateToProps = (state) => {
    return (
        {
            showsubcatbyname: state.subcategories.subcatbyname,
            route: state.route.pathname
        }
    );
}
const mapDispatchToProps = (dispatch) => ({
    action: {
        subcategories: bindActionCreators(SUbCategoriesAction, dispatch),
        //   route:bindActionCreators(routeAction,dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Coursedetail);
