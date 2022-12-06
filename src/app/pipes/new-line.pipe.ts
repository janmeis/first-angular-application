import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLine'
})
export class NewLinePipe implements PipeTransform {

  transform(str: string): string {
    return str.replace(/\n/g, '<br />')
  }
}
