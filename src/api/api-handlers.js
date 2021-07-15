import firebase from 'firebase/app';
import { FIREBASE_CONFIG, databaseURL } from './api-config';

export const initApi = () => {
  return firebase.initializeApp(FIREBASE_CONFIG);
};
