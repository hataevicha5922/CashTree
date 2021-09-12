import { signUp } from '../../api/api-handlers';
import { routes } from '../../shared/constants/routs';

import {
  passwordStrengthController,
  emailLengthValidator,
  nameValidator,
} from '../../shared/validators';
import {
  showErrorMessage,
  hideErrorMessage,
} from '../../shared/error-handlers';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

export const singUpHandler = () => {
  const signUpForm = document.querySelector('.sign-up_form');
  const password_1 = document.getElementById('password_1');
  const password_2 = document.getElementById('password_2');
  const signup_btn = document.getElementById('signup_btn');
  const emailInput = document.getElementById('email');
  const userNameInput = document.getElementById('userName');
  const userSurnameInput = document.getElementById('surname');
  const preloader = document.getElementById('preloader');
  const userInfo = document.getElementById('header-links-info');

  const formFields = {
    userName: {
      isValid: false,
    },
    userSurname: {
      isValid: false,
    },
    email: {
      isValid: false,
    },
    password_1: {
      isValid: false,
    },
    password_2: {
      isValid: false,
    },
  };

  signup_btn.setAttribute('disabled', true);
  signup_btn.addEventListener('click', () => {
    preloader.style.display = 'block';
  });

  userNameInput.oninput = () => {
    if (nameValidator(userNameInput.value)) {
      formFields.userName.isValid = true;
      userNameInput.classList.remove('invalid');
      hideErrorMessage('userNameError');
    } else {
      formFields.userName.isValid = false;
      userNameInput.classList.add('invalid');
    }
    checkFormValid();
  };

  userNameInput.onblur = () => {
    !nameValidator(userNameInput.value)
      ? showErrorMessage('userNameError', ERROR_MESSAGES.userName)
      : hideErrorMessage('userNameError');
  };

  userSurnameInput.oninput = () => {
    if (nameValidator(userSurnameInput.value)) {
      formFields.userSurname.isValid = true;
      userSurnameInput.classList.remove('invalid');
      hideErrorMessage('userSurnameError');
    } else {
      formFields.userSurname.isValid = false;
      userSurnameInput.classList.add('invalid');
    }
    checkFormValid();
  };

  userSurnameInput.onblur = () => {
    !nameValidator(userSurnameInput.value)
      ? showErrorMessage('userSurnameError', ERROR_MESSAGES.userSurnameError)
      : hideErrorMessage('userSurnameError');
  };

  emailInput.oninput = () => {
    if (emailLengthValidator(emailInput.value)) {
      formFields.email.isValid = true;
      hideErrorMessage('emailError');
      emailInput.classList.remove('invalid');
    } else {
      formFields.email.isValid = false;
      emailInput.classList.add('invalid');
    }
    checkFormValid();
  };

  emailInput.onblur = () => {
    !emailLengthValidator(emailInput.value)
      ? showErrorMessage('emailError', ERROR_MESSAGES.email)
      : hideErrorMessage('emailError');
  };

  password_1.oninput = () => {
    formFields.password_1.isValid = passwordStrengthController(
      password_1.value
    );
    checkFormValid();
  };

  password_2.oninput = () => {
    formFields.password_2.isValid =
      formFields.password_1 && password_1.value === password_2.value;
    checkFormValid();
  };

  password_2.onblur = () => {
    password_1.value !== password_2.value
      ? showErrorMessage(
          'passwordsCompereError',
          ERROR_MESSAGES.passwordsComparer
        )
      : hideErrorMessage('passwordsCompereError');
  };

  const checkFormValid = () => {
    const isFormValid = Object.values(formFields).every(
      (value) => value.isValid
    );
    isFormValid
      ? signup_btn.removeAttribute('disabled')
      : signup_btn.setAttribute('disabled', true);
  };

  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const user = {
      firstName: userNameInput.value,
      lastName: userSurnameInput.value,
      email: emailInput.value,
      password: password_1.value,
    };
    const email = emailInput.value;
    const password = password_1.value;
    signUp(user).then((response) => {
      if (response) {
        preloader.style.display = 'none';
        window.location.href = routes.main_page;
      } else {
        preloader.style.display = 'none';
      }
    });
  });
};
