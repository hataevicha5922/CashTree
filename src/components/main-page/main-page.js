import moment from 'moment';
import { LocalStorageService } from '../../shared/ls-service';
import { expensesResult } from '../expenses-handler/expenses-handler';

export const renderDate = () => {
  const userName = document.getElementById('header-links-info');
  const date = document.getElementById('date');
  const weekDays = document.getElementById('weekday');

  date.innerText = moment().format('MMM Do YY');
  weekDays.innerText = moment().format('dddd');
  userName.innerText = `${LocalStorageService.getPersonalData().firstName} ${
    LocalStorageService.getPersonalData().lastName
  }`;
};
