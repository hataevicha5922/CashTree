import moment from 'moment';
import { getIncome, deleteIncome } from '../../api/api-handlers';
import { LocalStorageService } from '../../shared/ls-service';

const userNameTag = document.getElementById('header-links-info');
const incomeSum = document.querySelector('.income-sum');

export const renderIncome = async () => {
  const incomeContainer = document.getElementById('income-container');
  const userId = LocalStorageService.getPersonalData().id;

  let incomes;

  incomeContainer.innerHTML = null;

  userNameTag.innerText = `${LocalStorageService.getPersonalData().firstName} ${
    LocalStorageService.getPersonalData().lastName
  }`;

  await getIncome()
    .then((result) => {
      const transformedIncomesArray = Object.keys(result).map((key) => ({
        ...result[key],
      }));
      incomes = transformedIncomesArray[0];
    })
    .catch((error) => console.log(error)); // will be removed after adding an error message

  let incomeUser = [];
  Object.values(incomes).map((income) =>
    income.userId === userId ? incomeUser.push(income) : false
  );

  incomeUser.forEach((income) => {
    const incomeWrapper = document.createElement('div');
    const incomeBlock = document.createElement('div');
    const title = document.createElement('h5');
    const value = document.createElement('p');
    const userName = document.createElement('span');
    const incomeDate = document.createElement('span');
    const buttonWrapper = document.createElement('div');
    const buttonChange = document.createElement('button');
    const buttonDelete = document.createElement('button');

    incomeWrapper.className = 'income-wrapper';
    incomeWrapper.setAttribute('id', `${income.incomeId}`);
    incomeBlock.className = 'income-info';
    userName.className = 'income-user-name';
    value.className = 'income-value';
    buttonWrapper.className = 'income-btns';
    buttonChange.className = 'change-button';
    buttonDelete.className = 'delete-button';

    title.innerHTML = income.categories;
    value.innerHTML = `${income.valueIncome} BYN`;
    incomeDate.innerHTML = moment(income.date).format('MMM Do YY');
    incomeBlock.append(title, value, userName, incomeDate);
    buttonWrapper.append(buttonChange, buttonDelete);
    incomeWrapper.append(incomeBlock, buttonWrapper);
    incomeContainer.append(incomeWrapper);
  });

  let result = incomeUser.reduce((res, item) => {
    return +res + +item.valueIncome;
  }, 0);

  incomeSum.innerText = `Income: ${result} BYN`;
};
