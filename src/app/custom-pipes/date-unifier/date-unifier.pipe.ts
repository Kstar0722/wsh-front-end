import { Pipe, PipeTransform } from '@angular/core';
import { DateParserService } from '../../services/date-parser/date-parser.service';

@Pipe({
  name: 'unifyDate'
})
export class DateUnifierPipe implements PipeTransform {
  transform(dateInput: any, args?: any): any {
    return DateParserService.parse(dateInput);
  }
}
