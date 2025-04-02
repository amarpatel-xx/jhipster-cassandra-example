import dayjs from 'dayjs/esm';
import utc from 'dayjs/esm/plugin/utc';
import { Pipe, PipeTransform } from '@angular/core';

dayjs.extend(utc);

export const DATE_FORMAT_2 = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT_2 = 'YYYY-MM-DDTHH:mm:ss';

export function dateLongToDayjs(dateLong: number | undefined | null): dayjs.Dayjs {
  if (dateLong == null) {
    return dayjs();
  }
  return dayjs.utc(dateLong);
}

@Pipe({
  name: 'convertFromDateLongToDayjs',
  standalone: true,
})
export default class ConvertFromDateLongToDayjsPipe implements PipeTransform {
  transform(source: number | undefined | null): dayjs.Dayjs | undefined {
    return source ? dateLongToDayjs(source) : undefined;
  }
}
