import { signIn } from '../../api/api-handlers';
import { routes } from '../../shared/constants/routs';
import { setToken } from '../../shared/ls-service';

export const signInHandler = () => {
  const signInForm = document.querySelector('.sign-in_form');

  signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signIn(email, password).then((response) => {
      if (response) {
        const { idToken: token } = response.data;
        setToken(token);
        window.location.href = routes.main_page;
      }
    });
  });
};
