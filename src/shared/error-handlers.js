import { ERROR_MESSAGES } from './constants/error-messages';

export const showErrorMessage = (id, message) => {
  const errorTag = document.getElementById(id);
  errorTag.style.display = 'block';
  errorTag.innerText = message;
};

export const hideErrorMessage = (id) => {
  const errorTag = document.getElementById(id);
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

export const showErrorAuthMessage = (err) => {
  const authError = document.getElementById('authError');
  authError.style.display = 'block';
  authError.innerText = err.message;
  setTimeout(() => {
    authError.style.display = 'none';
  }, 5000);
};
