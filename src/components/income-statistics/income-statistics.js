// import { getIncome, deleteIncome } from '../../api/api-handlers';
// import { LocalStorageService } from '../../shared/ls-service';

// export const drawChart = (salary = 100, spinOff = 20) => {
//   let data = google.visualization.arrayToDataTable([
//     ['Task', 'Hours per Day'],
//     ['Salary', salary],
//     ['Spin-off', spinOff],
//   ]);

//   let options = {
//     title: 'My Income',
//     pieHole: 0.4,
//   };

//   let chart = new google.visualization.PieChart(
//     document.getElementById('donutchart')
//   );
//   chart.draw(data, options);
// };

// google.charts.load('current', { packages: ['corechart'] });
// google.charts.setOnLoadCallback(drawChart);

// export const counterSalary = async () => {
//   const userId = LocalStorageService.getPersonalData().id;

//   let incomes;

//   await getIncome()
//     .then((result) => {
//       const transformedIncomesArray = Object.keys(result).map((key) => ({
//         ...result[key],
//       }));
//       incomes = transformedIncomesArray[0];
//     })
//     .catch((error) => console.log(error));

//   let incomeUser = [];
//   Object.values(incomes).map((income) =>
//     income.userId === userId ? incomeUser.push(income) : false
//   );

//   const salaryValues = [];
//   incomeUser.map((item) => {
//     item.categories === 'Salary' ? salaryValues.push(item) : false;
//   });

//   let salary = salaryValues.reduce((res, item) => {
//     return +res + +item.valueIncome;
//   }, 0);

//   const spinOffValues = [];
//   incomeUser.map((item) => {
//     item.categories === 'Spin-off' ? spinOffValues.push(item) : false;
//   });

//   let spinOff = spinOffValues.reduce((res, item) => {
//     return +res + +item.valueIncome;
//   }, 0);

//   drawChart(salary, spinOff);
// };
