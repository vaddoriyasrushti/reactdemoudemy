import React, { Component } from 'react';
import { Row, Col, Label, Button, Form, FormGroup, Input } from "reactstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
// import { Link } from 'react-router-dom';
import { Avatar } from 'antd'
import * as registerAction from '../action/auth';
import reactlogo from '../assets/reactlogo.png';
import { Link } from 'react-router-dom';

class UserRegistration extends Component {
    state = {
        email: "",
        password: "",
        role: 3,
        fieldsErrors: { email: '', password: ''},
        fieldsValid: {  email: false, password: false },
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
            case 'email':
                fieldValidation.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = fieldValidation.email ? '' : ' Invalid email';
                break;
            case 'password':
                fieldValidation.password = value.length >= 6;
                fieldValidationErrors.password = fieldValidation.password ? '' : ' Password is too short';
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
            formValid:
                this.state.fieldsValid.email &&
                this.state.fieldsValid.password 
               
        });
    }

    inputChangeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) })
    }

    btnRegisterClick() {
        console.log("buttonRegisterclick")
        if (this.state.password === "")
            this.setState({
                fieldsErrors: {
                    // ...this.state.fieldsErrors,
                    password: "* Password Required"
                }
            })
        if (this.state.email === "")
            this.setState({
                fieldsErrors: {
                    // ...this.state.fieldsErrors,
                    email: "* Email Required"
                }
            })

        if (this.state.formValid) {
               this.props.action.register.loginUser(this.state).then((res)=>{
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
                <div size="sm" style={{ color: '#464d69', marginTop: "100px", textAlign: "center" }}><Avatar shape="square" size={70} src={reactlogo} /><h4 ><br />Login To Admin</h4></div>
                <center><span style={{ color: "red" }}>{this.state.error}</span></center>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: "15px" }}>
                    <Row  >
                        <Col >
                            <Form style={{ width: "500px" }}>
                                <FormGroup>
                                    <Label for="email"><b>Email</b></Label>
                                    <Input type="email" name="email" id="email" placeholder="example@example.com" onChange={this.inputChangeHandler.bind(this)} required />
                                    <span style={{ color: "red" }}>{this.state.fieldsErrors.email}</span>
                                    <span style={{ color: "red" }}>{this.state.inValidEmail}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password"><b>Password</b></Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" onChange={this.inputChangeHandler.bind(this)} required />
                                    <span style={{ color: "red" }}>{this.state.fieldsErrors.password}</span>
                                </FormGroup>
                                <FormGroup>
                                <Button style={{backgroundColor:"#5d92f4"}} onClick={this.btnRegisterClick.bind(this)} block>Login Now</Button>
                                <Button style={{backgroundColor:"#FF8C00"}} tag={Link} to='/signup' block>Create Account</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
         register: bindActionCreators(registerAction, dispatch)
    }
})
export default connect(null,mapDispatchToProps)(UserRegistration);