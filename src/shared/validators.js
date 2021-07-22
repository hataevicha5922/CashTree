import { REGEXP } from './constants/regexp';

export const passwordLengthValidator = (password) =>
  password.match(REGEXP.PASSWORD_LENGTH);

export const emailLengthValidator = (email) => email.match(REGEXP.EMAIL);
