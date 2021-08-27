import { paths } from './shared/constants/routs';
import { signInHandler } from './components/sign-in/sign-in';
import { logoutBtnHandler } from './components/profile/profile';
import { singUpHandler } from './components/sign-up/sign-up';
import { incomeHandler } from '../src/components/income/income';
import { expensesHandler } from '../src/components/expenses/expenses';
import { renderIncome } from './components/income-handler/income-handler';
import './styles/styles.scss';
import { renderDate, showBalance } from './components/main-page/main-page';
import { renderExpenses } from './components/expenses-handler/expenses-handler';
import { counterSalary } from './components/income-statistics/income-statistics';
import { counterExpenses } from './components/expenses-statistics/expenses-statistics';

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
      showBalance();
      renderDate();
      break;
    case paths.sign_up:
      singUpHandler();
      break;
    case paths.income:
      incomeHandler();
      logoutBtnHandler();
      break;
    case paths.expenses:
      expensesHandler();
      logoutBtnHandler();
      break;
    case paths.income_handler:
      renderIncome();
      logoutBtnHandler();
      break;
    case paths.expenses_handler:
      renderExpenses();
      logoutBtnHandler();
      break;
    case paths.income_statistics:
      counterSalary();
      logoutBtnHandler();
      break;
    case paths.expenses_statistics:
      counterExpenses();
      logoutBtnHandler();
      break;
    default:
      break;
  }
};
