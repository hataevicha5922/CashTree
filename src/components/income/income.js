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
  const incomeSalary = document.getElementById('income-salary');
  const incomeBtn = document.getElementById('incomeBtn');
  const userName = document.getElementById('header-links-info');
  const preloader = document.getElementById('preloader');
  const balanceInfo = document.getElementById('header-links-balance');
  const balance = LocalStorageService.getBalance();

  balanceInfo.innerText = ` ${balance} BYN`;

  userName.innerText = userName.innerText = `${
    LocalStorageService.getPersonalData().firstName
  } ${LocalStorageService.getPersonalData().lastName}`;

  incomeBtn.setAttribute('disabled', true);
  incomeBtn.addEventListener('onclick', () => {
    preloader.style.display = 'block';
  });

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
  };

  incomeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    income.valueIncome = incomeInputValue.value;
    income.categories = incomeSalary.value;

    setIncome(income).then((response) => {
      if (response) {
        preloader.style.display = 'none';
        window.location.href = routes.main_page;
      }
      preloader.style.display = 'none';
    });
  });
};
