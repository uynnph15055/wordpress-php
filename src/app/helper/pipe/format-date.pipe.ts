import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';
@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  date: string;
  dateFormat: string;
  transform(value: any): string {
    this.date = moment(value).format('h:mm DD/MM/YYYY')
    let arrDate = this.date.split(' ');
    return arrDate[0] + ' - ' + arrDate[1];
  }

}
