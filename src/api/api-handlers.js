import firebase from 'firebase/app';
import axios from 'axios';

import { FIREBASE_CONFIG, databaseURL, authUrl } from './api-config';

require('firebase/auth');

export const initApi = () => {
  return firebase.initializeApp(FIREBASE_CONFIG);
};

export const signIn = (email, password) => {
  return axios
    .post(authUrl, {
      email,
      password,
      returnSecureToken: true,
    })
    .then((response) => response)
    .catch((err) => err);
};

export const signUp = async (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => response);
};

initApi();
