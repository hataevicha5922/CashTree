import { ERROR_MESSAGES } from './constants/error-messages';

export const showPasswordLengthErrorMessage = () => {
  const errorTag = document.getElementById('passwordLengthError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.password_length;
};

export const hidePasswordLengthErrorMessage = () => {
  const inputErrorTag = document.getElementById('passwordLengthError');
  inputErrorTag.style.display = 'none';
};

export const showEmailErrorMessage = () => {
  const errorTag = document.getElementById('emailError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.email;
};

export const hideEmailErrorMessage = () => {
  const errorTag = document.getElementById('emailError');
  errorTag.style.display = 'none';
};

export const showUserNameErrorMessage = () => {
  const errorTag = document.getElementById('userNameError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.userName;
};

export const hideUserNameErrorMessage = () => {
  const errorTag = document.getElementById('userNameError');
  errorTag.style.display = 'none';
};

export const showUserSurnameErrorMessage = () => {
  const errorTag = document.getElementById('userSurnameError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.userSurnameError;
};

export const hideUserSurnameErrorMessage = () => {
  const errorTag = document.getElementById('userSurnameError');
  errorTag.style.display = 'none';
};

export const showErrorNotification = (error) => {
  const notification = document.createElement('div');
  const body = document.getElementsByTagName('body')[0];
  notification.innerText = error.response.data.error.message;
  notification.className = 'error-notification';
  body.appendChild(notification);
  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
};

export const showPasswordsComparerError = () => {
  const errorTag = document.getElementById('passwordsCompereError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.passwordsComparer;
};

export const hidePasswordsComparerError = () => {
  const errorTag = document.getElementById('passwordsCompereError');
  errorTag.style.display = 'none';
};

export const showIncomeValueError = () => {
  const errorTag = document.getElementById('incomeValueError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.incomeValueError;
};

export const hideIncomeValueError = () => {
  const errorTag = document.getElementById('incomeValueError');
  errorTag.style.display = 'none';
};

export const showExpensesValueError = () => {
  const errorTag = document.getElementById('expensesValueError');
  errorTag.style.display = 'block';
  errorTag.innerText = ERROR_MESSAGES.incomeValueError;
};

export const hideExpensesValueError = () => {
  const errorTag = document.getElementById('expensesValueError');
  errorTag.style.display = 'none';
};

export const showErrorAuthMessage = (err) => {
  const authError = document.getElementById('authError');
  authError.style.display = 'block';
  authError.innerText = err.message;
  setTimeout(() => {
    authError.style.display = 'none';
  }, 5000);
};
