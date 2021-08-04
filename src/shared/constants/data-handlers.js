import moment, { Moment } from 'moment';

export const showCurrentDate = (tagDay, tagWeekDay) => {
  tagDay.innerText = moment().format('LL');
  tagWeekDay.innerText = moment().format('ddd');
};
