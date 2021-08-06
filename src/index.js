import { paths } from './shared/constants/routs';
import { signInHandler } from './components/sign-in/sign-in';
import { logoutBtnHandler } from './components/profile/profile';
import { singUpHandler } from './components/sign-up/sign-up';
import {
  renderIncomeSum,
  renderExpensesSum,
} from './components/main-page/main-page';
import { incomeHandler } from '../src/components/income/income';
import { expensesHandler } from '../src/components/expenses/expenses';
import { getIncome } from './api/api-handlers';
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
      renderIncomeSum();
      renderExpensesSum();
      getIncome();
      break;
    case paths.sign_up:
      singUpHandler();
      break;
    case paths.income:
      incomeHandler();
      renderIncomeSum();
      break;
    case paths.expenses:
      expensesHandler();
      break;
    default:
      break;
  }
};
