import { signUp } from '../../api/api-handlers';
import { setUserEmail } from '../../shared/ls-service';
import { routes } from '../../shared/constants/routs';

import {
  passwordStrengthController,
  emailLengthValidator,
  nameValidator,
} from '../../shared/validators';
import {
  showPasswordsComparerError,
  hidePasswordsComparerError,
  hideEmailErrorMessage,
  showEmailErrorMessage,
  showUserNameErrorMessage,
  hideUserNameErrorMessage,
  showUserSurnameErrorMessage,
  hideUserSurnameErrorMessage,
} from '../../shared/error-handlers';

export const singUpHandler = () => {
  const signUpForm = document.querySelector('.sign-up-form');
  const password_1 = document.getElementById('password_1');
  const password_2 = document.getElementById('password_2');
  const signup_btn = document.getElementById('signup_btn');
  const emailInput = document.getElementById('email');
  const userNameInput = document.getElementById('userName');
  const userSurnameInput = document.getElementById('surname');
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

  userNameInput.oninput = () => {
    if (nameValidator(userNameInput.value)) {
      formFields.userName.isValid = true;
      userNameInput.classList.remove('invalid');
      hideUserNameErrorMessage();
    } else {
      formFields.userName.isValid = false;
      userNameInput.classList.add('invalid');
    }
    checkFormValid();
  };

  userNameInput.onblur = () => {
    !nameValidator(userNameInput.value)
      ? showUserNameErrorMessage()
      : hideUserNameErrorMessage();
  };

  userSurnameInput.oninput = () => {
    if (nameValidator(userSurnameInput.value)) {
      formFields.userSurname.isValid = true;
      userSurnameInput.classList.remove('invalid');
      hideUserSurnameErrorMessage();
    } else {
      formFields.userSurname.isValid = false;
      userSurnameInput.classList.add('invalid');
    }
    checkFormValid();
  };

  userSurnameInput.onblur = () => {
    !nameValidator(userSurnameInput.value)
      ? showUserSurnameErrorMessage()
      : hideUserSurnameErrorMessage();
  };

  emailInput.oninput = () => {
    if (emailLengthValidator(emailInput.value)) {
      formFields.email.isValid = true;
      hideEmailErrorMessage();
      emailInput.classList.remove('invalid');
    } else {
      formFields.email.isValid = false;
      emailInput.classList.add('invalid');
    }
    checkFormValid();
  };

  emailInput.onblur = () => {
    !emailLengthValidator(emailInput.value)
      ? showEmailErrorMessage()
      : hideEmailErrorMessage();
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
      ? showPasswordsComparerError()
      : hidePasswordsComparerError();
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
    const email = emailInput.value;
    const password = password_1.value;
    signUp(email, password).then((response) => {
      if (response) {
        setUserEmail(response.user.email);
        console.log(userInfo);
        userInfo.innerText = response.user.email;
        window.location.href = routes.main_page;
      }
    });
  });
};
