import { Pipe, PipeTransform } from '@angular/core';
import { PortStatus } from '../enums/port-status.enum';

@Pipe({
  name: 'portStatus'
})
export class PortStatusPipe implements PipeTransform {
  static descriptions = {
    [PortStatus.Open]: 'Aberto',
    [PortStatus.Close]: 'Fechado'
  }

  transform(status: PortStatus): string {
    return PortStatusPipe.descriptions[status];
  }
}
