import { signIn } from '../../api/api-handlers';
import { routes } from '../../shared/constants/routs';
import { LocalStorageService } from '../../shared/ls-service';
import {
  passwordLengthValidator,
  emailLengthValidator,
} from '../../shared/validators';
import {
  showErrorMessage,
  hideErrorMessage,
} from '../../shared/error-handlers';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

export const signInHandler = () => {
  const signInForm = document.querySelector('.sign-in_form');
  const signInBtn = document.getElementById('signInBtn');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const preloader = document.getElementById('preloader');

  const formFields = {
    email: {
      isValid: false,
    },
    password: {
      isValid: false,
    },
  };

  signInBtn.setAttribute('disabled', true);
  signInBtn.addEventListener('click', () => {
    preloader.style.display = 'block';
  });

  signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    signIn(email, password).then((response) => {
      if (response) {
        const { idToken: token } = response.data;
        LocalStorageService.setToken(token);
        preloader.style.display = 'none';
        window.location.href = routes.main_page;
      } else {
        preloader.style.display = 'none';
      }
    });
  });

  passwordInput.oninput = () => {
    if (passwordLengthValidator(passwordInput.value)) {
      formFields.password.isValid = true;
      hideErrorMessage('passwordLengthError');
      passwordInput.classList.remove('invalid');
    } else {
      formFields.password.isValid = false;
      passwordInput.classList.add('invalid');
    }
    checkFormValid();
  };

  passwordInput.onblur = () => {
    !passwordLengthValidator(passwordInput.value)
      ? showErrorMessage('passwordLengthError', ERROR_MESSAGES.password_length)
      : hideErrorMessage('passwordLengthError');
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

  const checkFormValid = () => {
    const isFormValid = Object.values(formFields).every(
      (value) => value.isValid
    );
    isFormValid
      ? signInBtn.removeAttribute('disabled')
      : signInBtn.setAttribute('disabled', true);
  };

  checkFormValid();
};
