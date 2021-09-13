import firebase from 'firebase/app';
import axios from 'axios';
import { routes } from '../shared/constants/routs';
import { v4 as uuidv4 } from 'uuid';

import { FIREBASE_CONFIG, databaseURL, authUrl } from './api-config';
import {
  showErrorNotification,
  showErrorAuthMessage,
} from '../shared/error-handlers';
import { LocalStorageService } from '../shared/ls-service';
import moment from 'moment';

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
      const transformedUsers = Object.keys(response.data).map((key) => ({
        ...response.data[key],
        id: key,
      }));
      const user = transformedUsers.find(
        (user) => user.uuid === LocalStorageService.getUID()
      );
      LocalStorageService.setPersonalData(user);
    }
  });
};

export const getUserById = (id) => axios.get(`${databaseURL}/users/${id}.json`);

export const getUsers = () => {
  return axios.get(`${databaseURL}/users.json`).then((response) => {
    if (response) {
      return Object.keys(response.data).map((key) => ({
        ...response.data[key],
        id: key,
      }));
    }
  });
};

export const signUp = async (user) => {
  const { password, email } = user;

  try {
    await createAuthData(email, password);
    await createUser(user).then((response) =>
      LocalStorageService.setUserId(response.data.name)
    );
    await signIn(email, password);
  } catch (error) {
    showErrorAuthMessage(error);
  }
};

export const setIncome = (income) => {
  const { userId, valueIncome, categories, currency, date } = income;

  return axios
    .post(`${databaseURL}/income.json`, {
      valueIncome,
      categories,
      currency,
      date,
      userId,
      incomeId: uuidv4(),
    })
    .catch((err) => {
      console.log(err);
      showErrorNotification(err);
    });
};

export const getIncome = () => {
  return axios.get(`${databaseURL}/income.json`);
};

export const deleteIncome = (id) => {
  return axios.delete(`${databaseURL}/income/${id}.json`);
};

export const setIncomeRes = (sum) =>
  axios.post(`${databaseURL}/incomeSum.json`, { sum });

export const setExpenses = (expenses) => {
  const { valueExpenses, categoriesExpenses, currencyExpenses, userId, date } =
    expenses;

  return axios.post(`${databaseURL}/expenses.json`, {
    valueExpenses,
    categoriesExpenses,
    currencyExpenses,
    date,
    userId,
  });
};

export const getExpenses = () => {
  return axios.get(`${databaseURL}/expenses.json`);
};

export const deleteExpenses = (id) => {
  return axios.delete(`${databaseURL}/expenses/${id}.json`);
};

initApi();
