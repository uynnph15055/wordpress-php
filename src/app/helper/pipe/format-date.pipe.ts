import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';
@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  date: string;
  transform(value: any): string {
    this.date = moment(value).format(' h:mm MM-DD-YYYY')
    return this.date;
  }

}
