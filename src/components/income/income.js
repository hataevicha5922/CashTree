import moment from 'moment';
import { setIncome } from '../../api/api-handlers';
import { routes } from '../../shared/constants/routs';
import { LocalStorageService } from '../../shared/ls-service';
import {
  showIncomeValueError,
  hideIncomeValueError,
} from '../../shared/error-handlers';
import { incomeValidator } from '../../shared/validators';

export const incomeHandler = () => {
  const incomeForm = document.getElementById('income-form');
  const incomeInputValue = document.getElementById('income-input');
  // comments will be removed after adding functionality
  // const incomeCurrency = document.getElementById('income-currency');
  const incomeSalary = document.getElementById('income-salary');
  const incomeBtn = document.getElementById('incomeBtn');
  const userName = document.getElementById('header-links-info');

  userName.innerText = userName.innerText = `${
    LocalStorageService.getPersonalData().firstName
  } ${LocalStorageService.getPersonalData().lastName}`;

  incomeBtn.setAttribute('disabled', true);

  incomeInputValue.oninput = () => {
    if (incomeValidator(incomeInputValue.value)) {
      hideIncomeValueError();
      incomeBtn.removeAttribute('disabled');
    } else {
      showIncomeValueError();
      incomeBtn.setAttribute('disabled', true);
    }
  };

  const income = {
    userId: LocalStorageService.getPersonalData().id,
    date: moment().format(),
    valueIncome: null,
    categories: null,
    // comments will be removed after adding functionality
    // currency: incomeCurrency.value,
  };

  incomeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    income.valueIncome = incomeInputValue.value;
    income.categories = incomeSalary.value;

    setIncome(income).then((response) => {
      if (response) {
        window.location.href = routes.income_handler;
      }
    });
  });
};
