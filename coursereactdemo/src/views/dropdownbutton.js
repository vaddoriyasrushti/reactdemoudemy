import React from 'react';
import { notification } from 'antd';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem ,Button} from 'reactstrap';
import PaypalExpressBtn from 'react-paypal-express-checkout';
// import scriptLoader from 'react-async-script-loader';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
        };
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    onSuccess = (payment) => {
        notification['success']({
            message: 'Payment Success',
            description:
              'The payment is successful! Thanks for shopping with paypal',
          });
    }
    onCancel = (data) => {
        console.log('The payment was cancelled!', data);
    }
    onError = (err) => {
        console.log("Error!", err);
    }
    env = 'sandbox';
    currency = 'USD';
    client = {
        sandbox: 'AXAzueVvIwhtE_WxJVbeyFOoaHuxlje3Y-1kwsQjvnUHUis1d3xpTavFxJON5gu0hBV5TjSNWn2hm9VJ',
        production: 'AXAzueVvIwhtE_WxJVbeyFOoaHuxlje3Y-1kwsQjvnUHUis1d3xpTavFxJON5gu0hBV5TjSNWn2hm9VJ',
    }
    render() {
        let x = `${
            this.props.cart.courseCart.reduce(function (prev, cur) {
                return prev + cur.price;
            }, 0)}`
    
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <Button id="caret" color="danger">Check Out</Button>
                <DropdownToggle caret color="danger" />
                <DropdownMenu>
                    <DropdownItem><PaypalExpressBtn env={this.env} client={this.client} currency={this.currency} total={parseInt(x*0.014,10)} onError={this.onError} onSuccess={this.onSuccess} onCancel={this.onCancel} /></DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        );
        
    }
}
// export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(Example);