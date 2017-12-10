import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 survey credits"
                amount={500}//amount is in US cents - 5 USD
                token={token => this.props.handleToken(token)}//token returned from Stripe after receiving credit card details
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add Credits
                </button>
          </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);