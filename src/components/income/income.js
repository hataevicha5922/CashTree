import { setIncome, getIncome } from '../../api/api-handlers';
import { routes } from '../../shared/constants/routs';

export const incomeHandler = () => {
  const incomeForm = document.getElementById('income-form');
  const incomeInputValue = document.getElementById('income-value');
  const incomeCurrency = document.getElementById('income-currency');
  const incomeSalary = document.getElementById('income-salary');

  incomeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const income = {
      valueIncome: incomeInputValue.value,
      categories: incomeSalary.value,
      currency: incomeCurrency.value,
    };
    setIncome(income).then((response) => {
      if (response) {
        window.location.href = routes.main_page;
      }
    });
  });
};
