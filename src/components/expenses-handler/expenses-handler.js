import moment from 'moment';
import { getExpenses, deleteExpenses } from '../../api/api-handlers';
import { LocalStorageService } from '../../shared/ls-service';
import { routes } from '../../shared/constants/routs';

const userNameTag = document.getElementById('header-links-info');
const deleteValue = document.getElementById('delete-value');

export let expensesResult;

export const renderExpenses = async () => {
  const expensesContainer = document.getElementById('expenses-container');
  const userId = LocalStorageService.getPersonalData().id;
  const btnShow = document.getElementById('show-expenses');
  const expensesSum = document.getElementById('expenses-sum');
  const container = document.querySelector('.expenses');
  const balanceInfo = document.getElementById('header-links-balance');
  const balance = LocalStorageService.getBalance();

  let expenses;

  balanceInfo.innerText = ` ${balance} BYN`;

  expensesContainer.innerHTML = null;

  userNameTag.innerText = `${LocalStorageService.getPersonalData().firstName} ${
    LocalStorageService.getPersonalData().lastName
  }`;

  await getExpenses()
    .then((response) => {
      if (response) {
        return Object.keys(response.data).map((key) => ({
          ...response.data[key],
          id: key,
        }));
      }
    })
    .then((result) => (expenses = result));

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
    const buttonDelete = document.createElement('button');

    expenseCard.className = 'income-card';
    incomeWrapper.className = 'income-wrapper';
    incomeBlock.className = 'income-info';
    userName.className = 'income-user-name';
    value.className = 'income-value';
    buttonWrapper.className = 'income-btns';
    buttonDelete.className = 'delete-button';

    buttonDelete.setAttribute('data-bs-toggle', 'modal');
    buttonDelete.setAttribute('data-bs-target', '#staticBackdrop');
    title.innerHTML = expense.categoriesExpenses;
    value.innerHTML = `${expense.valueExpenses} BYN`;
    incomeDate.innerHTML = moment(expense.date).format('MMM Do YY');
    incomeBlock.append(title, value, userName, incomeDate);
    buttonWrapper.append(buttonDelete);
    incomeWrapper.append(incomeBlock);
    expenseCard.append(incomeWrapper, buttonWrapper);
    expensesContainer.append(expenseCard);

    buttonDelete.onclick = (event) => {
      event.preventDefault();
      const expensesValue = document.querySelector('.exp-value');

      expensesValue.innerText = `${expense.categoriesExpenses}: ${
        expense.valueExpenses
      } BYN ${moment(expense.date).format('MMM Do YY')} ?`;
      deleteValue.onclick = async () => {
        await deleteExpenses(expense.id);
        window.location.href = routes.main_page;
      };
    };
  });

  btnShow.onclick = () => {
    const dateStart = document.getElementById('start-date');
    const dateEnd = document.getElementById('end-date');
    let start = Date.parse(dateStart.value);
    let end = Date.parse(dateEnd.value);
    let arrDate = [];

    expensesContainer.innerHTML = null;

    for (let i = start; i <= end; i = i + 24 * 60 * 60 * 1000) {
      arrDate.push(moment(i).format('MMM Do YY'));
    }

    arrDate.map((item) => {
      expensesArr.forEach((expense) => {
        if (moment(expense.date).format('MMM Do YY') === item) {
          const expenseCard = document.createElement('div');
          const incomeWrapper = document.createElement('div');
          const incomeBlock = document.createElement('div');
          const title = document.createElement('h5');
          const value = document.createElement('p');
          const userName = document.createElement('span');
          const incomeDate = document.createElement('span');
          const buttonWrapper = document.createElement('div');
          const buttonDelete = document.createElement('button');

          expenseCard.className = 'income-card';
          incomeWrapper.className = 'income-wrapper';
          incomeBlock.className = 'income-info';
          userName.className = 'income-user-name';
          value.className = 'income-value';
          buttonWrapper.className = 'income-btns';
          buttonDelete.className = 'delete-button';

          buttonDelete.setAttribute('data-bs-toggle', 'modal');
          buttonDelete.setAttribute('data-bs-target', '#staticBackdrop');
          title.innerHTML = expense.categoriesExpenses;
          value.innerHTML = `${expense.valueExpenses} BYN`;
          incomeDate.innerHTML = moment(expense.date).format('MMM Do YY');
          incomeBlock.append(title, value, userName, incomeDate);
          buttonWrapper.append(buttonDelete);
          incomeWrapper.append(incomeBlock);
          expenseCard.append(incomeWrapper, buttonWrapper);
          expensesContainer.append(expenseCard);

          buttonDelete.onclick = (event) => {
            event.preventDefault();
            const expensesValue = document.querySelector('.exp-value');

            expensesValue.innerText = `${expense.categoriesExpenses}: ${
              expense.valueExpenses
            } BYN ${moment(expense.date).format('MMM Do YY')} ?`;
            deleteValue.onclick = async () => {
              await deleteExpenses(expense.id);
              window.location.href = routes.main_page;
            };
          };
        }
      });
    });

    const expensesLength = document.querySelectorAll('.income-card');
    if (expensesLength.length > 0) {
      expensesSum.innerText = `Period from ${moment(start).format(
        'MMM Do YY'
      )} to ${moment(end).format('MMM Do YY')}`;
    } else {
      expensesSum.innerText = `There were no expenses`;
    }
  };

  expensesResult = expensesArr.reduce((res, expense) => {
    return res + +expense.valueExpenses;
  }, 0);
  expensesSum.innerText = `Expenses: ${expensesResult} BYN`;
};
