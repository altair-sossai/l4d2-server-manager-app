import { Pipe, PipeTransform } from '@angular/core';
import { Status, StatusDescription } from '../enums/status.enum';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  private static titles = {
    [Status.NovaAtivacao]: 'Nova ativação',
    [Status.Liberado]: 'Liberado',
    [Status.ProximoExpirar]: 'Próximo a expirar',
    [Status.Expirado]: 'Expirado',
    [Status.Bloqueado]: 'Bloqueado',
    [Status.Vitalicio]: 'Vitalício'
  }

  transform(status: Status): string {
    return StatusDescription[status];
  }
}
