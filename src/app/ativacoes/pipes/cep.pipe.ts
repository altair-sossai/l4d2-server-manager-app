import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(cep: string): string {
    const patter = /^(\d{2})(\d{3})(\d{3})$/;
    const replace = '$1.$2-$3';

    return patter.test(cep) ? cep.replace(patter, replace) : cep;
  }
}
