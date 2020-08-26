import React from 'react';
import {useOktaAuth} from '@okta/okta-react';
import {OKTA_DOMAIN} from '../config';

export default function LogOutButton(props) {
  const {authState, authService} = useOktaAuth();
  const issuer = `https://${OKTA_DOMAIN}/oauth2/default`;
  const redirectUri = `${window.location.origin}/`;

  async function handleLogout() {
    await authService.logout('/');
    window.location.href = `${issuer}/v1/logout?id_token_hint=${authState.idToken}&post_logout_redirect_uri=${redirectUri}`;
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
