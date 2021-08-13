import moment from 'moment';
import { getIncome, getUsers } from '../../api/api-handlers';
import { LocalStorageService } from '../../shared/ls-service';

export const renderIncome = async () => {
  const incomeContainer = document.getElementById('income-container');

  let incomes;
  let users;

  // incomeContainer.innerHTML = null;

  await getIncome()
    .then((result) => {
      const transformedIncomesArray = Object.keys(result).map((key) => ({
        ...result[key],
      }));
      incomes = Object.values(transformedIncomesArray[0]);
      let incomeUserId = Object.values(transformedIncomesArray[0]).map(
        (item) => item.userId
      );
    })
    .catch((error) => console.log(error)); // will be removed after adding an error message

  await getUsers().then((response) => {
    users = response;
  });

  const userId = LocalStorageService.getPersonalData().id;

  incomes.forEach((income) => {
    const user = users.find((item) => item.id === userId);
    const incomeBlock = document.createElement('div');
    const title = document.createElement('h5');
    const value = document.createElement('p');
    const userName = document.createElement('span');
    const incomeDate = document.createElement('span');

    incomeBlock.className = 'income-wrapper';
    userName.className = 'income-user-name';

    title.innerHTML = income.categories;
    value.innerHTML = `${income.valueIncome} BYN`;
    userName.innerHTML = `${user.firstName} ${user.lastName}`;
    incomeDate.innerHTML = moment(income.date).format('MMM Do YY');
    incomeBlock.append(title, value, userName, incomeDate);
    incomeContainer.append(incomeBlock);
  });
};

renderIncome();
