import { REGEXP } from './constants/regexp';
import { PASSWORD_STRENGTHS, PASSWORD_INFO } from '../shared/constants/common';

export const passwordLengthValidator = (password) =>
  password.match(REGEXP.PASSWORD_LENGTH);

export const emailLengthValidator = (email) => email.match(REGEXP.EMAIL);

export const nameValidator = (userName) => userName.match(REGEXP.NAME);

export const incomeValidator = (incomeValue) =>
  incomeValue.match(REGEXP.INCOME);

const validation_status = document.querySelector(
  '.sign-up-form-password-strength-status-current'
);

const lowerCaseCheck = (password) => {
  const validation_info = document.querySelector(
    '.sign-up-form-password-strength-status-info-lowercase'
  );
  validation_info.innerText = PASSWORD_INFO.lowercase;
  const result = REGEXP.LOWER_CASE.test(password);
  result
    ? (validation_info.style.color = 'blue')
    : (validation_info.style.color = 'grey');
  return result;
};

const upperCaseCheck = (password) => {
  const validation_info = document.querySelector(
    '.sign-up-form-password-strength-status-info-uppercase'
  );
  validation_info.innerText = PASSWORD_INFO.uppercase;
  const result = REGEXP.UPPER_CASE.test(password);
  result
    ? (validation_info.style.color = 'blue')
    : (validation_info.style.color = 'grey');
  return result;
};

const numberCheck = (password) => {
  const validation_info = document.querySelector(
    '.sign-up-form-password-strength-status-info-numbers'
  );
  validation_info.innerText = PASSWORD_INFO.numbers;
  const result = REGEXP.NUMBERS.test(password);
  result
    ? (validation_info.style.color = 'blue')
    : (validation_info.style.color = 'grey');
  return result;
};

const eightCharactersCheck = (password) => {
  const validation_info = document.querySelector(
    '.sign-up-form-password-strength-status-info-characters'
  );
  validation_info.innerText = PASSWORD_INFO.characters;
  const result = REGEXP.EIGHT_CHARACTERS.test(password);
  result
    ? (validation_info.style.color = 'blue')
    : (validation_info.style.color = 'grey');
  return result;
};

export const passwordStrengthController = (password) => {
  const passwordStrengthNum =
    lowerCaseCheck(password) +
    upperCaseCheck(password) +
    numberCheck(password) +
    eightCharactersCheck(password);

  let passwordStrength;

  Object.keys(PASSWORD_STRENGTHS).forEach((item) => {
    if (PASSWORD_STRENGTHS[item] === passwordStrengthNum) {
      passwordStrength = item;
    }
  });

  const filler = document.querySelector(
    '.sign-up-form-password-strength-status-filler'
  );
  const passwordStrengthInfo = document.querySelector(
    '.sign-up-form-password-strength'
  );

  switch (passwordStrengthNum) {
    case 1:
      passwordStrengthInfo.style.display = 'block';
      filler.classList.add('weak');
      filler.classList.remove('moderate');
      validation_status.innerText = 'Weak';
      validation_status.className =
        'sign-up-form-password-strength-status-current-weak';
      break;
    case 2:
      filler.classList.add('moderate');
      filler.classList.remove('strong');
      validation_status.innerText = 'Moderate';
      validation_status.className =
        'sign-up-form-password-strength-status-current-moderate';
      break;
    case 3:
      filler.classList.add('strong');
      filler.classList.remove('veryStrong');
      validation_status.innerText = 'Strong';
      validation_status.className =
        'sign-up-form-password-strength-status-current-strong';
      break;
    case 4:
      filler.classList.add('veryStrong');
      validation_status.innerText = 'Complete';
      validation_status.className =
        'sign-up-form-password-strength-status-current-complete';
      break;
    default:
      filler.classList.remove('weak');
      break;
  }

  return passwordStrengthNum === 4;
};
