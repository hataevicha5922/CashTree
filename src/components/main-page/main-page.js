import moment from 'moment';
import { LocalStorageService } from '../../shared/ls-service';
import { getIncome, deleteIncome } from '../../api/api-handlers';
import { getExpenses } from '../../api/api-handlers';
import { expensesResult } from '../expenses-handler/expenses-handler';

export const showBalance = async () => {
  const userId = LocalStorageService.getPersonalData().id;
  const balance = document.getElementById('balance-value');

  let incomes = [];
  let expenses = [];

  await getIncome().then((result) => {
    const transformedIncomesArray = Object.keys(result).map((key) => ({
      ...result[key],
    }));
    incomes = transformedIncomesArray[0];
  });

  let incomeUser = [];
  Object.values(incomes).map((income) =>
    income.userId === userId ? incomeUser.push(income) : false
  );

  let resIncome = incomeUser.reduce((result, item) => {
    return +result + +item.valueIncome;
  }, 0);

  await getExpenses().then((response) => {
    const transformedExpensesArray = Object.keys(response).map((key) => ({
      ...response[key],
    }));
    expenses = transformedExpensesArray[0];
  });

  let expensesUser = [];
  Object.values(expenses).map((item) =>
    item.userId === userId ? expensesUser.push(item) : false
  );

  let resExpenses = expensesUser.reduce((res, item) => {
    return +res + +item.valueExpenses;
  }, 0);

  let balanceValue = resIncome - resExpenses;

  balance.innerText = ` ${balanceValue} BYN`;
};

export const renderDate = () => {
  const userName = document.getElementById('header-links-info');
  const date = document.getElementById('date');
  const weekDays = document.getElementById('weekday');

  date.innerText = moment().format('MMM Do YY');
  weekDays.innerText = moment().format('dddd');
  userName.innerText = `${LocalStorageService.getPersonalData().firstName} ${
    LocalStorageService.getPersonalData().lastName
  }`;
};
