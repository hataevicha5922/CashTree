import moment from 'moment';
import {
  setUserIncome,
  getUserIncome,
  removeUserIncome,
  setUserExpenses,
  getUserExpenses,
  removeUserExpenses,
} from '../../shared/ls-service';

export const incomeHandler = () => {
  const btnIncome = document.querySelector('.btn-income');
  const modalIncome = document.querySelector('.modal');
  const btnCloseIncome = document.querySelector('.btn-close');
  const btnAddIncome = document.querySelector('#add-income');
  const inputIncome = document.getElementById('income-value');
  const infoIncome = document.querySelector('.finance-value-income-num');
  const infoExpenses = document.querySelector('.finance-value-expenses-num');

  let income = 0;

  btnIncome.onclick = () => {
    modalIncome.style.display = 'block';
  };

  btnCloseIncome.onclick = () => {
    modalIncome.style.display = 'none';
  };

  btnAddIncome.onclick = () => {
    income = +income + +inputIncome.value;
    inputIncome.value = null;
    modalIncome.style.display = 'none';
    setUserIncome(income);
    let resIncome = getUserIncome(income);
    infoIncome.innerText = `${resIncome}`;
    balanceHandler(infoIncome.innerText, infoExpenses.innerText);
    return resIncome;
  };
};

export const expensesHandler = () => {
  const btnExpenses = document.getElementById('btn-expenses');
  const modalExpenses = document.getElementById('expenses');
  const btnCloseExpenses = document.querySelector('.close-expenses');
  const expensesValue = document.getElementById('expenses-value');
  const btnAddExpenses = document.getElementById('add-expenses');
  const infoExpenses = document.querySelector('.finance-value-expenses-num');
  const infoIncome = document.querySelector('.finance-value-income-num');

  let expenses = 0;

  btnCloseExpenses.onclick = () => {
    modalExpenses.style.display = 'none';
  };

  btnExpenses.onclick = () => {
    modalExpenses.style.display = 'block';
  };

  btnAddExpenses.onclick = () => {
    expenses = +expenses + +expensesValue.value;
    expensesValue.value = null;
    modalExpenses.style.display = 'none';
    setUserExpenses(expenses);
    let resExpenses = getUserExpenses(expenses);
    infoExpenses.innerText = `${resExpenses}`;
    balanceHandler(infoIncome.innerText, infoExpenses.innerText);
    return resExpenses;
  };
};

export const balanceHandler = (income, expenses) => {
  const balanceInfo = document.querySelector('.finance-value-balance-num');
  let balance = +income - +expenses;

  balanceInfo.innerText = `${balance}`;
};
