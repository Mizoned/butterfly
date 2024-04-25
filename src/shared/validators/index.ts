import { getTimeFromDate } from '@/shared/utils';

export const isDate = (value: any): boolean => {
  return value instanceof Date;
}

export const compareDatesInTime = (date1: Date, date2: Date) => {
  const strTime1 = getTimeFromDate(date1);
  const strTime2 = getTimeFromDate(date2);

  return strTime1 >= strTime2;
}