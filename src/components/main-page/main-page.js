import { getIncome } from '../../api/api-handlers';

export const renderIncomeSum = async () => {
  const incomeContainer = document.getElementById('income-value');
  let result;

  await getIncome().then(
    (response) =>
      (result = Object.values(response.data).reduce(
        (sum, current) => sum + Number(current.valueIncome),
        0
      ))
  );
  incomeContainer.innerText = `+ ${result} BYN`;
  console.log(result);
};

renderIncomeSum();
