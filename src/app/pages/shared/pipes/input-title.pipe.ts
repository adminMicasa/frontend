import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputTile'
})
export class InputTitlePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const cleanedString = value.replace(/[^\w\s]/gi, '');
     const words = cleanedString.split(' ').map(word => this.capitalizeFirstLetter(word));
     const result = words.join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
     return result;
  }

  private capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}
