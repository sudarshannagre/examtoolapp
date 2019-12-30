import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initcap'
})
export class InitcapPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.charAt(0).toUpperCase()+value.substring(1);
  }

}
