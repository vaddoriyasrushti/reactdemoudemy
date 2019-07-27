import React, { Component } from 'react';
import { Row, Col, Label, Button, Form, FormGroup, Input } from "reactstrap";
//import { PanelHeader } from "components";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import { Avatar } from 'antd'
import * as registerAction from '../action/auth';
import reactlogo from '../assets/reactlogo.png'

class UserRegistration extends Component {
    state = {
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: 3,
        fieldsErrors: { fullname: '', email: '', password: '', confirmPassword: '' },
        fieldsValid: { fullname: false, email: false, password: false, confirmPassword: false },
        formValid: false,
        inValidEmail: "",
        error:""
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.err_msg === "") {
    //         this.setState({ inValidEmail: "" })
    //         this.props.history.push('/login');
    //     }
    //     else {
    //         this.setState({ inValidEmail: nextProps.err_msg })
    //     }
    // }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.fieldsErrors;
        let fieldValidation = this.state.fieldsValid;

        switch (fieldName) {
            case 'fullname':
                fieldValidation.fullname = value.match(/^[a-zA-Z 0-9]+$/i);
                fieldValidationErrors.fullname = fieldValidation.fullname ? '' : ' Invalid first name'
                break;

            case 'email':
                fieldValidation.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = fieldValidation.email ? '' : ' Invalid email';
                break;
            case 'password':
                fieldValidation.password = value.length >= 6;
                fieldValidationErrors.password = fieldValidation.password ? '' : ' Password is too short';
                break;
            case 'confirmPassword':
                var confirmPassword = value;
                var password = this.state.password;
                fieldValidation.confirmPassword = (password === confirmPassword);
                fieldValidationErrors.confirmPassword = fieldValidation.confirmPassword ? '' : ' Confirm Password Doesn\'t Match';
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
            formValid: this.state.fieldsValid.fullname &&
                this.state.fieldsValid.email &&
                this.state.fieldsValid.password &&
                this.state.fieldsValid.confirmPassword
        });
    }

    inputChangeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value,error:"" }, () => { this.validateField(name, value) })
    }

    btnRegisterClick() {
        console.log("buttonRegisterclick")
        if (this.state.confirmPassword === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    confirmPassword: "* Password Required"
                }
            })
        if (this.state.password === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    password: "* Password Required"
                }
            }        
            )

        if (this.state.email === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    email: "* Email Required"
                }
            })

        if (this.state.fullname === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    fullname: "* First Name Required"
                }
            })
        let abc = true;
        if (this.state.password!==this.state.confirmPassword) {
            abc = false;
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    password: "* Passwords are not same"
                }
            })
        }

        if (this.state.formValid && abc) {
            console.log("pass data in register", this.state)
               this.props.action.register.RegisterUser(this.state).then((res)=>{
                this.props.history.push('/');
               }).catch((error)=>{
                this.setState({
                    ...this.state,
                    error:error
                    })   
               })
        }
    }

    render() {
        return (
            <div>
                <div size="sm" style={{ color: '#464d69', marginTop: "40px", textAlign: "center" }}><Avatar shape="square" size={70} src={reactlogo} /><h4 ><br />Sign Up</h4></div>
                <center>Already have an account? <Link to="/login" path="/login">Login</Link></center>
              
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: "15px" }}>
                    <Row  >
                        <Col >
                            <Form style={{ width: "500px" }}>
                                <FormGroup>
                                    <Label for="fullname"><b>User Name</b></Label>
                                    <Input type="text" name="fullname" id="fullname" placeholder="First Name" onChange={this.inputChangeHandler.bind(this)} required />
                                    <span style={{ color: "red" }}>{this.state.fieldsErrors.fullname}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email"><b>Email</b></Label>
                                    <Input type="email" name="email" id="email" placeholder="example@example.com" onChange={this.inputChangeHandler.bind(this)} required />
                                    <span style={{ color: "red" }}>{this.state.fieldsErrors.email}</span>
                                    <span style={{ color: "red" }}>{this.state.inValidEmail}</span>
                                    <span style={{ color: "red" }}>{this.state.error}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password"><b>Password</b></Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" onChange={this.inputChangeHandler.bind(this)} required />
                                    <span style={{ color: "red" }}>{this.state.fieldsErrors.password}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="confirmPassword"><b>Confirm Password</b></Label>
                                    <Input type="password" name="confirmPassword" id="confirmPassword" onChange={this.inputChangeHandler.bind(this)} placeholder="Confirm Password" required/>
                                    <span style={{ color: "red" }}>{this.state.fieldsErrors.confirmPassword}</span>
                                </FormGroup>
                                <FormGroup>
                                <Button style={{backgroundColor:"#5d92f4"}} onClick={this.btnRegisterClick.bind(this)} block>Sign Up</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     // const { auth } = state;
//     // return {
//     //     auth: auth,
//     //     err_msg: auth.error_msg,
//     //     email: auth.email
//     // }
// }

const mapDispatchToProps = (dispatch) => ({
    action: {
         register: bindActionCreators(registerAction, dispatch)
    }
})
export default connect(null,mapDispatchToProps)(UserRegistration);