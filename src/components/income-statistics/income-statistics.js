import { getIncome } from '../../api/api-handlers';
import { LocalStorageService } from '../../shared/ls-service';

const userNameTag = document.getElementById('header-links-info');

export const counterSalary = async () => {
  const userId = LocalStorageService.getPersonalData().id;

  userNameTag.innerText = `${LocalStorageService.getPersonalData().firstName} ${
    LocalStorageService.getPersonalData().lastName
  }`;

  let incomes;

  await getIncome()
    .then((result) => {
      const transformedIncomesArray = Object.keys(result).map((key) => ({
        ...result[key],
      }));
      incomes = transformedIncomesArray[0];
    })
    .catch((error) => console.log(error));

  let incomeUser = [];
  Object.values(incomes).map((income) =>
    income.userId === userId ? incomeUser.push(income) : false
  );

  const salaryValues = [];
  incomeUser.map((item) => {
    item.categories === 'Salary' ? salaryValues.push(item) : false;
  });

  let salary = salaryValues.reduce((res, item) => {
    return +res + +item.valueIncome;
  }, 0);

  const spinOffValues = [];
  incomeUser.map((item) => {
    item.categories === 'Spin-off' ? spinOffValues.push(item) : false;
  });

  let spinOff = spinOffValues.reduce((res, item) => {
    return +res + +item.valueIncome;
  }, 0);

  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Salary', salary],
      ['Spin-Off', spinOff],
    ]);

    var options = {
      title: 'My Income',
      pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(
      document.getElementById('donutchart')
    );
    chart.draw(data, options);
  }
};
