import React, {useState, useEffect} from 'react';
import {useOktaAuth} from '@okta/okta-react';
import {useHistory} from 'react-router-dom';
import OktaWidget from '../components/OktaWidget';
import LogoutButton from '../components/LogoutButton';

export default function Home(props) {
  const {authState, authService} = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]); // Update if authState changes

  async function onSuccess(res) {
    if (res.status === 'SUCCESS') {
      if (res.sessionToken) {
        return authService.redirect({
          sessionToken: res.session.token,
        });
      }

      history.push('/profile');
      return;
    }
  }

  async function onError(error) {
    console.log(error);
  }

  return (
    <div>
      {userInfo && (
        <div>
          <h1>Hello again!</h1>
          <p>Welcome back, {userInfo.name}!</p>
          <LogoutButton />
        </div>
      )}
      {!authState.isAuthenticated && (
        <>
          <h1>Welcome!</h1>
          <OktaWidget onSuccess={onSuccess} onError={onError} />
        </>
      )}
    </div>
  );
}
