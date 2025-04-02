import dayjs from 'dayjs/esm';
import utc from 'dayjs/esm/plugin/utc';
import { Pipe, PipeTransform } from '@angular/core';

dayjs.extend(utc);

// //////////////////////////////////////////////////////////////////////////////////////
// The below function and pipe are used in:
// (1) index.js,
// (2) entity-management-detail.component.html.ejs, and
// (3) entity-management.component.html.ejs.
// They are used for the [routerLink] component piping to convert date/timestamps to
// numbers.
// //////////////////////////////////////////////////////////////////////////////////////
export function dayjsToDateLongForPipe(datetimestamp: dayjs.Dayjs | number | null): number | null {
  if (datetimestamp === null) {
    return null;
  }

  if (typeof datetimestamp === 'number') {
    return datetimestamp;
  } else if (dayjs.isDayjs(datetimestamp)) {
    return datetimestamp.utc().valueOf();
  }
  return -1;
}

@Pipe({
  name: 'convertFromDayjsToDateLong',
  standalone: true,
})
export class ConvertFromDayjsToDateLongPipe implements PipeTransform {
  transform(source: dayjs.Dayjs | number | null): number | null {
    return source ? dayjsToDateLongForPipe(source) : null;
  }
}
