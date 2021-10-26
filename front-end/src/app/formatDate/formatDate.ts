import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'formatDate'
})
export class FormatDate extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, "dd/MM/y");
    }
}