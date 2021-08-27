import moment from 'moment';
import { getIncome, deleteIncome } from '../../api/api-handlers';
import { LocalStorageService } from '../../shared/ls-service';
import { routes } from '../../shared/constants/routs';

const userNameTag = document.getElementById('header-links-info');
const incomeSum = document.querySelector('.income-sum');

export const renderIncome = async () => {
  const incomeContainer = document.getElementById('income-container');
  const incomeHandler = document.querySelector('.income-handler');
  const userId = LocalStorageService.getPersonalData().id;
  let incomes;

  incomeContainer.innerHTML = null;

  userNameTag.innerText = `${LocalStorageService.getPersonalData().firstName} ${
    LocalStorageService.getPersonalData().lastName
  }`;

  await getIncome()
    .then((response) => {
      if (response) {
        return Object.keys(response.data).map((key) => ({
          ...response.data[key],
          id: key,
        }));
      }
    })
    .then((result) => (incomes = result));

  let incomeUser = [];
  Object.values(incomes).map((income) =>
    income.userId === userId ? incomeUser.push(income) : false
  );

  incomeUser.forEach((income) => {
    const incomeCard = document.createElement('div');
    const incomeWrapper = document.createElement('div');
    const incomeBlock = document.createElement('div');
    const title = document.createElement('h5');
    const value = document.createElement('p');
    const userName = document.createElement('span');
    const incomeDate = document.createElement('span');
    const buttonWrapper = document.createElement('div');
    // const buttonChange = document.createElement('button');
    const buttonDelete = document.createElement('button');

    incomeCard.className = 'income-card';
    incomeWrapper.className = 'income-wrapper';
    incomeWrapper.setAttribute('id', `${income.incomeId}`);
    incomeBlock.className = 'income-info';
    userName.className = 'income-user-name';
    value.className = 'income-value';
    buttonWrapper.className = 'income-btns';
    // buttonChange.className = 'change-button';
    buttonDelete.className = 'delete-button';

    buttonDelete.setAttribute('data-bs-toggle', 'modal');
    buttonDelete.setAttribute('data-bs-target', '#staticBackdrop');
    title.innerHTML = income.categories;
    value.innerHTML = `${income.valueIncome} BYN`;
    incomeDate.innerHTML = moment(income.date).format('MMM Do YY');
    incomeBlock.append(title, value, userName, incomeDate);
    buttonWrapper.append(buttonDelete);
    incomeWrapper.append(incomeBlock);
    incomeCard.append(incomeWrapper, buttonWrapper);
    incomeContainer.append(incomeCard);

    buttonDelete.onclick = (event) => {
      event.preventDefault();
      const incValue = document.querySelector('.inc-value');
      incValue.innerText = `${income.categories}: ${
        income.valueIncome
      } BYN ${moment(income.date).format('MMM Do YY')} ?`;
      const deleteValue = document.getElementById('delete-value');
      deleteValue.onclick = async () => {
        await deleteIncome(income.id);
        window.location.href = routes.main_page;
      };
    };
  });

  let result = incomeUser.reduce((res, item) => {
    return +res + +item.valueIncome;
  }, 0);

  incomeSum.innerText = `Income: ${result} BYN`;

  return result;
};
