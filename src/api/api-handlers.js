import firebase from 'firebase/app';
import axios from 'axios';
import { routes } from '../shared/constants/routs';

import { FIREBASE_CONFIG, databaseURL, authUrl } from './api-config';
import {
  showErrorNotification,
  showErrorAuthMessage,
} from '../shared/error-handlers';
import { LocalStorageService } from '../shared/ls-service';

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
    .then((response) => {
      if (response) {
        const { idToken: token, localId } = response.data;
        LocalStorageService.setToken(token);
        LocalStorageService.setUID(localId);
        getUser().then(() => (window.location.href = routes.main_page));
      }
    })
    .catch((err) => {
      showErrorNotification(err);
    });
};

export const createAuthData = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const { uid } = response.user;
      LocalStorageService.setUID(uid);
    });
};

export const createUser = (user) => {
  const { firstName, lastName, email } = user;

  return axios.post(`${databaseURL}/users.json`, {
    firstName,
    lastName,
    email,
    uuid: LocalStorageService.getUID(),
  });
};
export const getUser = () => {
  return axios.get(`${databaseURL}/users.json`).then((response) => {
    if (response) {
      const transformedUsers = Object.keys(response.data).map((key) => key);
    }
  });
};
export const getUserById = (id) => axios.get(`${databaseURL}/users/${id}.json`);

export const signUp = async (user) => {
  const { password, email } = user;

  try {
    await createAuthData(email, password);
    await createUser(user).then((response) =>
      LocalStorageService.setUserId(response.data.name)
    );
    await signIn(email, password);
  } catch (error) {
    showErrorNotification(error);
  }
};

initApi();
