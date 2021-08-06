import { setIncome } from '../../api/api-handlers';

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
    // console.log(income);
    setIncome(income);
  });
};
