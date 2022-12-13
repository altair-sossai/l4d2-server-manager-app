import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SuspectedPlayerSecretService } from '../../../suspected-player-secret/services/suspected-player-secret.service';
import { SuspectedPlayerCommand } from '../../commands/suspected-player.command';
import { SuspectedPlayerService } from '../../services/suspected-player.service';
import { SuspectedPlayer } from '../../suspected-player';

@Component({
  selector: 'app-suspected-players',
  templateUrl: './suspected-players.component.html',
  styleUrls: ['./suspected-players.component.scss']
})
export class SuspectedPlayersComponent implements OnInit {
  suspectedPlayers?: SuspectedPlayer[];

  constructor(private modalService: NzModalService,
    private messageService: NzMessageService,
    private suspectedPlayerService: SuspectedPlayerService,
    private suspectedPlayerSecretService: SuspectedPlayerSecretService) {
  }

  ngOnInit(): void {
    this.suspectedPlayerService.get().subscribe(suspectedPlayers => this.suspectedPlayers = suspectedPlayers)
  }

  refresh(): void {
    this.suspectedPlayers = undefined;
    this.suspectedPlayerService.get().subscribe(suspectedPlayers => this.suspectedPlayers = suspectedPlayers)
  }

  add(): void {
    const suspectedPlayer = prompt('Informe a URL ou ID da Steam do jogador');
    if (!suspectedPlayer)
      return;

    const command = new SuspectedPlayerCommand();
    command.account = suspectedPlayer;

    this.suspectedPlayers = undefined;
    this.suspectedPlayerService.post(command).subscribe({
      next: () => this.refresh(),
      error: () => this.refresh()
    });
  }

  deleteSecret(communityId: string): void {
    this.modalService.confirm({
      nzTitle: 'Deseja realmente excluir a secret do usuário?',
      nzOnOk: () => {
        this.suspectedPlayers = undefined;
        this.suspectedPlayerSecretService.delete(communityId).subscribe({
          next: () => {
            this.messageService.create('success', 'Excluido com sucesso');
            this.refresh();
          },
          error: () => this.refresh()
        });
      }
    });
  }

  delete(communityId: string): void {
    this.modalService.confirm({
      nzTitle: 'Deseja realmente excluir?',
      nzOnOk: () => {
        this.suspectedPlayers = undefined;
        this.suspectedPlayerService.delete(communityId).subscribe({
          next: () => {
            this.messageService.create('success', 'Excluido com sucesso');
            this.refresh();
          },
          error: () => this.refresh()
        });
      }
    });
  }
}
