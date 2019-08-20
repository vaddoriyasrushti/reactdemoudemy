import React, { Component } from 'react';
import { Label, Button, Form, FormGroup, Input } from "reactstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as registerAction from '../../action/auth';
import * as SubCategoriesAction from '../../action/subcategories';
import ImageUploader from 'react-images-upload';
import './teachonudemy.css';
import { Card, Rate, Row, Col } from 'antd';
import '../../container/card/card.css';
import deafultimg from '../../assets/default.png'

class UserRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardsrc: deafultimg,
            topicimage: [],
            populartopic: "",
            description: "",
            author: "",
            price: "",
            status: 0,
            fieldsErrors: { catname: '', allsubtosub: '', populartopic: '', description: '', author: '', price: '', imagefile: '', videofile: '' },
            fieldsValid: { catname: false, allsubtosub: false, populartopic: false, description: false, author: false, price: false, imagefile: false, videofile: false },
            formValid: false,
            error: "",
            allsubtosub: "",
            catname: "",
            videos: null,
            imgsrc: null
        };
    }

    componentDidMount() {
        this.props.action.subcat.FetchsubcatAction().then((res) => {
        })
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.fieldsErrors;
        let fieldValidation = this.state.fieldsValid;
        switch (fieldName) {
            case 'catname':
                fieldValidation.catname = value
                fieldValidationErrors.catname = fieldValidation.catname ? '' : null
                break;
            case 'allsubtosub':
                fieldValidation.allsubtosub = value
                fieldValidationErrors.allsubtosub = fieldValidation.allsubtosub ? '' : null
                break;
            case 'populartopic':
                fieldValidation.populartopic = value
                fieldValidationErrors.populartopic = fieldValidation.populartopic ? '' : null
                break;
            case 'description':
                fieldValidation.description = value
                fieldValidationErrors.description = fieldValidation.description ? '' : null
                break;
            case 'author':
                fieldValidation.author = value
                fieldValidationErrors.author = fieldValidation.author ? '' : null
                break;
            case 'price':
                fieldValidation.price = value.match(/[0-9]+[.]?[0-9]+?/);
                fieldValidationErrors.price = fieldValidation.price ? '' : ' Invalid price'
                break;
            case 'topicimage':
                fieldValidation.imagefile = value
                fieldValidationErrors.imagefile = fieldValidation.imagefile ? '' : null
                break;
            case 'video':
                fieldValidation.videofile = value
                fieldValidationErrors.videofile = fieldValidation.videofile ? '' : null
                break;
            default:
                break;
        }
        this.setState({
            fieldsErrors: { ...this.state.fieldsErrors, fieldValidationErrors },
            fieldsValid: fieldValidation,
        }, this.validateForm);
    }
    validateForm() {
        this.setState({
            formValid: this.state.fieldsValid.populartopic &&
                this.state.fieldsValid.description &&
                this.state.fieldsValid.price &&
                this.state.fieldsValid.author &&
                this.state.fieldsValid.imagefile &&
                this.state.fieldsValid.videofile
        });
    }
    inputChangeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value, error: "" }, () => { this.validateField(name, value) })
    }
    btnRegisterClick() {
        if (this.state.videos === null)
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    videofile: "* Please select Video of Course"
                }
            })
        if (this.state.topicimage.length <= 0)
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    imagefile: "* Please select Image as per Course"
                }
            })
        if (this.state.price === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    price: "* Price Required"
                }
            })
        if (this.state.author === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    author: "* Author Required"
                }
            })
        if (this.state.description === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    description: "* Description Required"
                }
            })
        if (this.state.populartopic === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    populartopic: "* Topic is Required"
                }
            })
        if (this.state.allsubtosub === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    allsubtosub: "* Subcategory is Required"
                }
            })
        if (this.state.catname === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    catname: "* Category is Required"
                }
            })
        if (this.state.formValid) {
            let formData = new FormData();
            formData.append("catname", this.state.catname);
            formData.append("allsubtosub", this.state.allsubtosub);
            formData.append("populartopic", this.state.populartopic);
            formData.append("description", this.state.description);
            formData.append("author", this.state.author);
            formData.append("price", this.state.price);
            formData.append("topicimage", this.state.topicimage);
            formData.append("videos", this.state.videos);
            formData.append("status", 0);
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            };
            this.props.action.subcat.postsubcategory(formData).then((res) => {
                this.props.history.push('/');
            }).catch((error) => {
                this.setState({
                    ...this.state,
                    error: error
                })
            })
        }
    }
    getsubtosubcategories = () => {
        var subtosubcat = [];
        this.props.subcat.filter((item) => { return (item.catname.toLowerCase() === this.state.catname.toLowerCase()) })
            .map((subcat) => {
                var index = subtosubcat.indexOf(subcat.subcategories)
                if (index === -1) {
                    subtosubcat.push(subcat.subcategories)
                }
            })
        return subtosubcat
    }

    onChangeHandler = event => {
        var file = event.target.files[0];
        var reader = new FileReader();
        if (file) {
            var url = reader.readAsDataURL(file);
        }
        reader.onloadend = function (e) {
            this.setState({
                imgsrc: [reader.result],
                videos: file,
                loaded: 0
            }, () => { this.validateField('video', file) })
        }.bind(this);
    }
    onDrop(picture) {
        var file = picture[0];
        var reader = new FileReader();
        if (file) {
            var url = reader.readAsDataURL(file);
        }
        reader.onloadend = function (e) {
            this.setState({
                cardsrc: [reader.result],
                topicimage: picture[0]
            }, () => { this.validateField('topicimage', picture) })
        }.bind(this);
    }
    render() {
        return (
            <Row className="main-wrap">
                <Col span={16} className="column-1">
                    <div className="afterheaderr">
                        <div size="sm" className="headingcenter"><h4><br />Add SubCategory</h4></div>
                        <div className="wrap-registration">
                            <Row  >
                                <Col >
                                    <Form className="form">
                                        <FormGroup>
                                            <Label for="category"><b>Categories</b></Label>
                                            <Input type="select" name="catname" id="category" onChange={this.inputChangeHandler.bind(this)}>
                                                <option value="">Select Category</option>
                                                {
                                                    this.props.showcat.map((value, index) => (
                                                        <option key={index} value={value.categoriesname}>{value.categoriesname}</option>
                                                    ))
                                                }
                                            </Input>
                                            <span className="validationcolor">{this.state.fieldsErrors.catname}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="subcategory"><b>Subcategories</b></Label>
                                            <Input type="select" name="allsubtosub" id="subcategory" onChange={this.inputChangeHandler.bind(this)}>
                                                <option value="">Select Subcategory</option>
                                                {
                                                    this.getsubtosubcategories().map((value, index) => (
                                                        <option key={index} >{value}</option>
                                                    ))
                                                }
                                            </Input>
                                            <span className="validationcolor">{this.state.fieldsErrors.allsubtosub}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="populartopic"><b>Your Topic Name</b></Label>
                                            <Input type="text" name="populartopic" id="populartopic" placeholder="Enter Your Topic Name" onChange={this.inputChangeHandler.bind(this)} required />
                                            <span className="validationcolor">{this.state.fieldsErrors.populartopic}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="description"><b>Description</b></Label>
                                            <Input type="text" name="description" id="description" placeholder="Enter Topic Description" onChange={this.inputChangeHandler.bind(this)} required />
                                            <span className="validationcolor">{this.state.fieldsErrors.description}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="author"><b>Author</b></Label>
                                            <Input type="text" name="author" id="author" placeholder="Enter Author Name" onChange={this.inputChangeHandler.bind(this)} required />
                                            <span className="validationcolor">{this.state.fieldsErrors.author}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="price"><b>Topic Price</b></Label>
                                            <Input type="text" name="price" id="price" placeholder="Enter topic Price" onChange={this.inputChangeHandler.bind(this)} required />
                                            <span className="validationcolor">{this.state.fieldsErrors.price}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="imagefile"><b>Related Image</b></Label>
                                            <ImageUploader
                                                withPreview={true}
                                                withIcon={true}
                                                buttonText='Choose images'
                                                onChange={this.onDrop.bind(this)}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.mp4']}
                                                maxFileSize={5242880}
                                                singleImage={true} />
                                            <span className="validationcolor">{this.state.fieldsErrors.imagefile}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="videofile"><b>Related Video</b></Label><br />
                                            {
                                                this.state.videos ?
                                                    <div className="fileContainer"><video
                                                        style={{ width: 200 }}
                                                        src={this.state.imgsrc}
                                                        preload="auto"
                                                        controls>
                                                    </video></div> : null
                                            }
                                            <Input type="file" name="videofile" onChange={this.onChangeHandler} />
                                            <span className="validationcolor">{this.state.fieldsErrors.videofile}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Button color="primary" onClick={this.btnRegisterClick.bind(this)} block>Add SubCategory</Button>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col span={8} className="column-2">
                    <Card
                        hoverable
                        className="card-width"
                        cover={<img alt="example" height='170px' src={this.state.cardsrc} />}>
                        <div className="make-ellipse description" >{this.state.description}</div>
                        <div className="mb-2" defaultValue="Subcategory">For : {this.state.allsubtosub}</div>
                        <div className="fs-14 mb-2">{this.state.author}</div>
                        <Rate allowHalf defaultValue={2.5} />
                        <div className="price"><h5 color="primary">₹{this.state.price}</h5></div>
                    </Card>
                </Col>
            </Row>
        );
    }
}
const mapStateToProps = (state) => {
    return ({
        showcat: state.categories.categories,
        subcat: state.subcategories.subcat
    });
}
const mapDispatchToProps = (dispatch) => ({
    action: {
        register: bindActionCreators(registerAction, dispatch),
        subcat: bindActionCreators(SubCategoriesAction, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);