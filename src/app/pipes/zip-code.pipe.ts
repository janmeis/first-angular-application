import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zipCode'
})
export class ZipCodePipe implements PipeTransform {

  transform(code: string): string {
    if (!/^\d{5}$/.test(code))
      return code;

    const zip = /(\d{3})(\d{2})/.exec(code) as RegExpExecArray;
    return `${zip[1]} ${zip[2]}`;
  }
}
