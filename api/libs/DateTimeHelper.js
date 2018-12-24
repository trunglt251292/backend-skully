import moment from 'moment-timezone';

export function dayToDate (dayOfYear) {
  let year = new Date().getFullYear();
  let date = new Date(year, 0); // initialize a date in `year-01-01`
  return new Date(date.setDate(dayOfYear)); // add the number of days
}

Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export function getDatesBetweenRange(startDate, endDate, addFn, interval) {
  addFn = addFn || Date.prototype.addDays;
  interval = interval || 1;

  let retVal = [];
  let current = new Date(startDate);

  while (current <= endDate) {
    retVal.push(moment(new Date(current)).tz('Asia/Jakarta').format());
    current = addFn.call(current, interval);
  }

  return retVal;
}
