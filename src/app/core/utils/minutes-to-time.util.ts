import * as moment from 'moment';

export function minutesToTime(mins: number): string {
  if (mins >= 24 * 60 || mins < 0) {
    throw new RangeError('Valid input should be greater than or equal to 0 and less than 1440.');
  }
  const hours = mins / 60 || 0;
  const minutes = mins % 60 || 0;
  return moment.utc().hours(hours).minutes(minutes).format('HH:mm');
}
