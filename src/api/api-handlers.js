import firebase from 'firebase/app';
import axios from 'axios';

import { FIREBASE_CONFIG, databaseURL, authUrl } from './api-config';

require('firebase/auth');

export const initApi = () => {
  return firebase.initializeApp(FIREBASE_CONFIG);
};

export const signIn = () => {
  return axios
    .post(authUrl, {
      email: 'test@mail.com',
      password: '111111',
      returnSecureToken: true,
    })
    .then((response) => response)
    .catch((err) => console.log(err));
};

initApi();
