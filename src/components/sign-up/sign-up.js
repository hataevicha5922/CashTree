import { signUp } from '../../api/api-handlers';
import { setUserEmail } from '../../shared/ls-service';

export const singUpHandler = () => {
  const signUpForm = document.querySelector('.sign-up-form');

  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userName = document.getElementById('userName').value;
    const surName = document.getElementById('secondName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password_1').value;

    signUp(email, password).then((response) => {
      if (response) {
        console.log(response.user.email);
        const { email } = response.user;
        setUserEmail(email);
      }
    });
  });
};
