import moment from 'moment';

export const renderDate = () => {
  const date = document.getElementById('date');
  const weekDays = document.getElementById('weekday');

  date.innerText = moment().format('MMM Do YY');
  weekDays.innerText = moment().format('dddd');
};
