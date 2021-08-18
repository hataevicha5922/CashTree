import { paths } from './shared/constants/routs';
import { signInHandler } from './components/sign-in/sign-in';
import { logoutBtnHandler } from './components/profile/profile';
import { singUpHandler } from './components/sign-up/sign-up';
import { incomeHandler } from '../src/components/income/income';
import { expensesHandler } from '../src/components/expenses/expenses';
import { getIncome, getUser } from './api/api-handlers';
import { renderIncome } from './components/income-handler/income-handler';
import './styles/styles.scss';
import { renderDate } from './components/main-page/main-page';
// import { showUserName } from './shared/constants/data-handlers';

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
      getIncome();
      getUser();
      renderDate();
      break;
    case paths.sign_up:
      singUpHandler();
      break;
    case paths.income:
      incomeHandler();
      break;
    case paths.expenses:
      expensesHandler();
      break;
    case paths.income_handler:
      renderIncome();
      break;
    case paths.expenses_handler:
      break;
    default:
      break;
  }
};
