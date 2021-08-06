import { setExpensesRes } from '../../api/api-handlers';
import { routes } from '../../shared/constants/routs';

export const expensesHandler = () => {
  const expensesForm = document.getElementById('expenses-form');
  const expensesInputValue = document.getElementById('expenses-input');
  const expenseCurrency = document.getElementById('expenses-currency');
  const expensesCategories = document.getElementById('expenses-categories');

  expensesForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const expenses = {
      valueExpenses: expensesInputValue.value,
      categoriesExpenses: expensesCategories.value,
      currencyExpenses: expenseCurrency.value,
    };

    setExpensesRes(expenses).then((response) => {
      if (response) {
        window.location.href = routes.main_page;
      }
    });
  });
};
