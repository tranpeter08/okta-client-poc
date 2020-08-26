import React, {Component} from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import {OKTA_DOMAIN} from '../config';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

export default class OktaSignInWidget extends Component {
  constructor(props) {
    super(props);
    this.div = React.createRef();
  }

  componentDidMount() {
    this.widget = new OktaSignIn({
      baseUrl: `https://${OKTA_DOMAIN}`,
      authParams: {
        // If your app is configured to use the Implicit Flow
        // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
        // you will need to uncomment the below line
        // pkce: false,
        // display: 'page',
      },
      clientId: '0oarc1cjmZJKUnTKm4x6',
      idps: [{type: 'GOOGLE', id: '0oareaqqo3Afs3rdf4x6'}],
      // redirectUri: 'http://localhost:3000/secured',
    });
    this.widget.renderEl(
      {el: this.div.current},
      this.props.onSuccess,
      this.props.onError
    );
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div ref={this.div} />;
  }
}
