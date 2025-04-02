import dayjs from 'dayjs/esm';
import utc from 'dayjs/esm/plugin/utc';

dayjs.extend(utc);

export const DATE_FORMAT_2 = 'YYYY-MM-DD';
export const DATE_FORMAT_3 = 'MM/DD/YYYY';

// This is the format compatible with the date time widget in angular.
//export const DATE_TIME_FORMAT_2 = "YYYY-MM-DDTHH:mm:ss"; // Example: 2022-04-16T02:31:30
export const DATE_TIME_FORMAT_2 = 'D MMM YYYY HH:mm:ss';

export const DATE_TIME_FORMAT_3 = 'MM-DD-YYYY, hh:mm A'; // Format 04-15-2022, 10:31 PM

// Unix Timestamp is equivalent to Millis from Epoch in the code below.
export function dateLongToFormattedString(dateLong: number | null): string {
  return dateLongToDayjs(dateLong).format(DATE_FORMAT_2);
}

export function dateLongToDayjs(dateLong: number | null): dayjs.Dayjs {
  let dayjsDate = dayjs();

  if (dateLong == null) {
    return dayjsDate;
  }

  dayjsDate = dayjs.utc(dateLong);

  return dayjsDate;
}

// This is the format compatible with the date time widget in angular.
export function datetimeLongToFormattedString(datetimeLong: number | null): string {
  let stringDate = dayjs().format(DATE_TIME_FORMAT_2);

  if (datetimeLong == null) {
    return stringDate;
  }

  stringDate = dayjs.utc(datetimeLong).local().format(DATE_TIME_FORMAT_2);

  return stringDate;
}

// The below function is used in entity.service.ts.ejs.
export function dayjsToDateLong(dayjsDate: any): number {
  let unixDate = dayjs().utc().valueOf();

  if (dayjsDate == null) {
    return unixDate;
  }

  if (dayjsDate instanceof dayjs) {
    unixDate = (dayjsDate as dayjs.Dayjs).utc().valueOf();
  }

  return unixDate;
}

// The below function is used in entity.service.ts.ejs.
export function formattedStringDateToDateLong(dateString: any): number {
  let unixDate = dayjs().utc().valueOf();

  if (dateString == null) {
    return unixDate;
  } else if (typeof dateString === 'string') {
    unixDate = dayjs(dateString).unix() * 1000;
  }

  return unixDate;
}

// The below function is used in entity.service.ts.ejs.
export function formattedStringToDateTimeLong(dateString: any, formatDatetime: string): number {
  let unixDate = dayjs().utc().valueOf();

  if (typeof dateString === 'string') {
    unixDate = dayjs(dateString, formatDatetime).utc().valueOf();
  }

  return unixDate;
}

export function datetimeStringToFormattedString(datetimeString: string): string {
  const stringDate = dayjs(datetimeString, DATE_TIME_FORMAT_3).format(DATE_TIME_FORMAT_2);

  return stringDate;
}
