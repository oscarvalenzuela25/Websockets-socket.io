import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

export const dateFormat = (date: Date) => {
  const todayMonth = moment(date);
  return todayMonth.format('HH:mmm a | MMMM Do');
};
