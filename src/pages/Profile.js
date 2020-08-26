import React, {useEffect, useState} from 'react';
import {useOktaAuth} from '@okta/okta-react';
import axios from 'axios';
import {RESOURCE_SERVER_URL} from '../config';
import LogoutButton from '../components/LogoutButton';

export default function Profile(props) {
  const {authState, authService} = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [assets, setAssets] = useState('loading...');

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });

      authService
        .getIdToken()
        .then((token) => {
          return axios.get(`${RESOURCE_SERVER_URL}/okta`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            method: 'get',
          });
        })
        .then((res) => {
          setAssets(res.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [authState, authService]); // Update if authState changes

  if (!userInfo) return null;

  return (
    <>
      <h1>Profile</h1>
      <p>Hello {userInfo.given_name}!</p>
      <p>From resource server: {assets || 'no assets returned'}</p>
      <LogoutButton />
    </>
  );
}
