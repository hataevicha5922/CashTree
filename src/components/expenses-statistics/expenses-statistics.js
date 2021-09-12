import { getExpenses } from '../../api/api-handlers';
import { LocalStorageService } from '../../shared/ls-service';

const userNameTag = document.getElementById('header-links-info');

export const counterExpenses = async () => {
  const userId = LocalStorageService.getPersonalData().id;
  const balanceInfo = document.getElementById('header-links-balance');
  const balance = LocalStorageService.getBalance();

  balanceInfo.innerText = ` ${balance} BYN`;

  userNameTag.innerText = `${LocalStorageService.getPersonalData().firstName} ${
    LocalStorageService.getPersonalData().lastName
  }`;

  let expenses;

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

  const foodValues = [];
  expensesArr.map((item) => {
    item.categoriesExpenses === 'Food' ? foodValues.push(item) : false;
  });

  let food = foodValues.reduce((res, item) => {
    return +res + +item.valueExpenses;
  }, 0);

  const transportValues = [];
  expensesArr.map((item) => {
    item.categoriesExpenses === 'Transport'
      ? transportValues.push(item)
      : false;
  });

  let transport = transportValues.reduce((res, item) => {
    return +res + +item.valueExpenses;
  }, 0);

  const medicinesValues = [];
  expensesArr.map((item) => {
    item.categoriesExpenses === 'Medicines'
      ? medicinesValues.push(item)
      : false;
  });

  let medicines = medicinesValues.reduce((res, item) => {
    return +res + +item.valueExpenses;
  }, 0);

  const educationValues = [];
  expensesArr.map((item) => {
    item.categoriesExpenses === 'Education'
      ? educationValues.push(item)
      : false;
  });

  let education = educationValues.reduce((res, item) => {
    return +res + +item.valueExpenses;
  }, 0);

  const clothesValues = [];
  expensesArr.map((item) => {
    item.categoriesExpenses === 'Clothes' ? clothesValues.push(item) : false;
  });

  let clothes = clothesValues.reduce((res, item) => {
    return +res + +item.valueExpenses;
  }, 0);

  const debenturesValues = [];
  expensesArr.map((item) => {
    item.categoriesExpenses === 'Debentures'
      ? debenturesValues.push(item)
      : false;
  });

  let debentures = debenturesValues.reduce((res, item) => {
    return +res + +item.valueExpenses;
  }, 0);

  const rentValues = [];
  expensesArr.map((item) => {
    item.categoriesExpenses === 'Rent' ? rentValues.push(item) : false;
  });

  let rent = rentValues.reduce((res, item) => {
    return +res + +item.valueExpenses;
  }, 0);

  const otherValues = [];
  expensesArr.map((item) => {
    item.categoriesExpenses === 'Other' ? otherValues.push(item) : false;
  });

  let other = otherValues.reduce((res, item) => {
    return +res + +item.valueExpenses;
  }, 0);

  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Food', food],
      ['Transport', transport],
      ['Medicines', medicines],
      ['Education', education],
      ['Clothes', clothes],
      ['Debentures', debentures],
      ['Rent', rent],
      ['Other', other],
    ]);

    var options = {
      title: 'My Expenses',
      pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(
      document.getElementById('donutchart')
    );
    chart.draw(data, options);
  }
};
