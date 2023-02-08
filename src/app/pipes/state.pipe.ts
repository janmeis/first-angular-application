import { Pipe, PipeTransform } from '@angular/core';
import { IState } from '../models/state';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {

  transform(abbreviation: string, states: IState[]): string {
    if (states.every(s => s.abbreviation != abbreviation))
      return abbreviation;

    return states.find(s => s.abbreviation == abbreviation)?.name || '';
  }
}
