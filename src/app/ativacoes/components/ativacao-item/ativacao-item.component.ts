import { Component, Input } from '@angular/core';
import { Status } from '../../enums/status.enum';
import { AtivacaoModel } from '../../models/ativacao.model';

@Component({
  selector: 'app-ativacao-item',
  templateUrl: './ativacao-item.component.html',
  styleUrls: ['./ativacao-item.component.scss']
})
export class AtivacaoItemComponent {

  @Input() ativacao!: AtivacaoModel;

  private static styles = {
    status: {
      [Status.NovaAtivacao]: 'nova-ativacao',
      [Status.Liberado]: 'liberado',
      [Status.ProximoExpirar]: 'proximo-expirar',
      [Status.Expirado]: 'expirado',
      [Status.Bloqueado]: 'bloqueado',
      [Status.Vitalicio]: 'vitalicio',
    }
  }

  constructor() { }

  get status(): string {
    return AtivacaoItemComponent.styles.status[this.ativacao.status];
  }
}
