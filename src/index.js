import { routes, paths } from './shared/constants/routs';
import { signInHandler } from './components/sign-in/sign-in';
import { logoutBtnHandler } from './components/profile/profile';
import { singUpHandler } from './components/sign-up/sign-up';
// import {
//   incomeHandler,
//   expensesHandler,
//   balanceHandler,
// } from './components/main-page/main-page';
import { incomeHandler } from '../src/components/income/income';
import './styles/styles.scss';

window.onload = () => {
  const pathname = Object.values(paths).find(
    (path) => path === window.location.pathname
  );

  switch (pathname) {
    case paths.home:
      break;
    case paths.sign_in:
      signInHandler();
      break;
    case paths.main_page:
      logoutBtnHandler();
      // incomeHandler();
      // expensesHandler();
      break;
    case paths.sign_up:
      singUpHandler();
      break;
    case paths.income:
      incomeHandler();
      break;
    default:
      break;
  }
};
