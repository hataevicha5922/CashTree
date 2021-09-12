import moment from 'moment';
import { setExpenses } from '../../api/api-handlers';
import { routes } from '../../shared/constants/routs';
import { LocalStorageService } from '../../shared/ls-service';
import { incomeValidator } from '../../shared/validators';
import {
  showErrorMessage,
  hideErrorMessage,
} from '../../shared/error-handlers';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

export const expensesHandler = () => {
  const expensesForm = document.getElementById('expenses-form');
  const expensesInputValue = document.getElementById('expenses-input');
  const expensesCategories = document.getElementById('expenses-categories');
  const userName = document.getElementById('header-links-info');
  const expensesBtn = document.getElementById('expensesBtn');
  const preloader = document.getElementById('preloader');
  const balanceInfo = document.getElementById('header-links-balance');
  const balance = LocalStorageService.getBalance();

  balanceInfo.innerText = ` ${balance} BYN`;

  userName.innerText = userName.innerText = `${
    LocalStorageService.getPersonalData().firstName
  } ${LocalStorageService.getPersonalData().lastName}`;

  expensesBtn.setAttribute('disabled', true);
  expensesBtn.addEventListener('onclick', () => {
    preloader.style.display = 'block';
  });

  expensesInputValue.oninput = () => {
    if (incomeValidator(expensesInputValue.value)) {
      hideErrorMessage('expensesValueError');
      expensesBtn.removeAttribute('disabled');
    } else {
      showErrorMessage('expensesValueError', ERROR_MESSAGES.incomeValueError);
      expensesBtn.setAttribute('disabled', true);
    }
  };

  const expenses = {
    valueExpenses: null,
    categoriesExpenses: null,
    userId: LocalStorageService.getPersonalData().id,
    date: moment().format(),
  };

  expensesForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (expensesInputValue.value > +balance) {
      alert('Not enough cash');
    } else {
      (expenses.valueExpenses = expensesInputValue.value),
        (expenses.categoriesExpenses = expensesCategories.value),
        setExpenses(expenses)
          .then((response) => {
            if (response) {
              window.location.href = routes.main_page;
            }
          })
          .catch((err) => console.log(err));
    }
  });
};
