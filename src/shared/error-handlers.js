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
  const inputErrorTag = document.getElementById('emailError');
  inputErrorTag.style.display = 'none';
};
