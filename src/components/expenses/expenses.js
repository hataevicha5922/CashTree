import moment from 'moment';
import { setExpenses } from '../../api/api-handlers';
import { routes } from '../../shared/constants/routs';
import { LocalStorageService } from '../../shared/ls-service';

export const expensesHandler = () => {
  const expensesForm = document.getElementById('expenses-form');
  const expensesInputValue = document.getElementById('expenses-input');
  const expenseCurrency = document.getElementById('expenses-currency');
  const expensesCategories = document.getElementById('expenses-categories');
  const userName = document.getElementById('header-links-info');

  userName.innerText = userName.innerText = `${
    LocalStorageService.getPersonalData().firstName
  } ${LocalStorageService.getPersonalData().lastName}`;

  const expenses = {
    valueExpenses: null,
    categoriesExpenses: null,
    userId: LocalStorageService.getPersonalData().id,
    date: moment().format(),
  };

  expensesForm.addEventListener('submit', (event) => {
    event.preventDefault();

    (expenses.valueExpenses = expensesInputValue.value),
      (expenses.categoriesExpenses = expensesCategories.value),
      setExpenses(expenses).then((response) => {
        if (response) {
          window.location.href = routes.main_page;
        }
      });
  });
};
