export const getToken = () => localStorage.getItem('token');

export const setToken = (token) => localStorage.setItem('token', token);

export const removeToken = () => localStorage.removeItem('token');

export const getUserEmail = () => localStorage.getItem('userEmail');

export const setUserEmail = (email) => localStorage.setItem('userEmail', email);

export const removeUserEmail = () => localStorage.removeItem('userEmail');

export const setUserIncome = (income) => localStorage.setItem('income', income);

export const getUserIncome = () => localStorage.getItem('income');

export const removeUserIncome = () => localStorage.removeItem('income');

export const setUserExpenses = (expenses) =>
  localStorage.setItem('expenses', expenses);

export const getUserExpenses = () => localStorage.getItem('expenses');

export const removeUserExpenses = () => localStorage.removeItem('expenses');

export class LocalStorageService {
  static getToken() {
    return localStorage.getItem('token');
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static getPersonalData() {
    return JSON.parse(localStorage.getItem('personalData'));
  }

  static setPersonalData(user) {
    localStorage.setItem('personalData', JSON.stringify(user));
  }

  static getUID() {
    return localStorage.getItem('uid');
  }
  static setUID(id) {
    localStorage.setItem('uid', id);
  }

  static getUserId() {
    return localStorage.getItem('userId');
  }

  static setUserId(id) {
    localStorage.setItem('userId', id);
  }

  static clearStorage() {
    localStorage.clear();
  }
}
