import moment from 'moment';
import { getExpenses } from '../../api/api-handlers';
import { LocalStorageService } from '../../shared/ls-service';

const userNameTag = document.getElementById('header-links-info');

export let expensesResult;
export const renderExpenses = async () => {
  const expensesContainer = document.getElementById('expenses-container');
  const userId = LocalStorageService.getPersonalData().id;
  const expensesSum = document.getElementById('expenses-sum');

  let expenses;

  expensesContainer.innerHTML = null;

  userNameTag.innerText = `${LocalStorageService.getPersonalData().firstName} ${
    LocalStorageService.getPersonalData().lastName
  }`;

  await getExpenses().then((result) => (expenses = result.data));

  let expensesArr = [];
  Object.values(expenses).map((expense) =>
    expense.userId === userId ? expensesArr.push(expense) : false
  );

  expensesArr.forEach((expense) => {
    const expenseCard = document.createElement('div');
    const incomeWrapper = document.createElement('div');
    const incomeBlock = document.createElement('div');
    const title = document.createElement('h5');
    const value = document.createElement('p');
    const userName = document.createElement('span');
    const incomeDate = document.createElement('span');
    const buttonWrapper = document.createElement('div');
    // const buttonChange = document.createElement('button');
    const buttonDelete = document.createElement('button');

    expenseCard.className = 'income-card';
    incomeWrapper.className = 'income-wrapper';
    incomeBlock.className = 'income-info';
    userName.className = 'income-user-name';
    value.className = 'income-value';
    buttonWrapper.className = 'income-btns';
    // buttonChange.className = 'change-button';
    buttonDelete.className = 'delete-button';

    title.innerHTML = expense.categoriesExpenses;
    value.innerHTML = `${expense.valueExpenses} BYN`;
    incomeDate.innerHTML = moment(expense.date).format('MMM Do YY');
    incomeBlock.append(title, value, userName, incomeDate);
    buttonWrapper.append(buttonDelete);
    incomeWrapper.append(incomeBlock);
    expenseCard.append(incomeWrapper, buttonWrapper);
    expensesContainer.append(expenseCard);
  });

  expensesResult = expensesArr.reduce((res, expense) => {
    return res + +expense.valueExpenses;
  }, 0);
  expensesSum.innerText = `Expenses: ${expensesResult} BYN`;
};
