import { Pipe, PipeTransform } from '@angular/core';
import { FailReason } from '../enums/fail-reason.enum';

@Pipe({
  name: 'failReason'
})
export class FailReasonPipe implements PipeTransform {

  transform(value: FailReason): string {
    if (value === FailReason.FileChanged)
      return "Arquivo alterado";

    if (value === FailReason.FileDeleted)
      return "Arquivo excluído";

    return `${value}`;
  }

}
