import { getExpenses, getIncome } from '../../api/api-handlers';

export const renderIncomeSum = async () => {
  const incomeContainer = document.getElementById('income-value');
  let result;

  // await getIncome().then(
  //   (response) =>
  //     (result = Object.values(response.data).reduce(
  //       (sum, current) => sum + Number(current.valueIncome),
  //       0
  //     ))
  // );
  // incomeContainer.innerText = `+ ${result} BYN`;
};

renderIncomeSum();

export const renderExpensesSum = async () => {
  const expensesContainer = document.getElementById('expenses-value');
  let res;

  // await getExpenses().then((response) => {
  //   res = Object.values(response.data).reduce(
  //     (sum, current) => sum + Number(current.valueExpenses),
  //     0
  //   );
  // });
  // expensesContainer.innerText = `- ${res} BYN`;
};

renderExpensesSum();
