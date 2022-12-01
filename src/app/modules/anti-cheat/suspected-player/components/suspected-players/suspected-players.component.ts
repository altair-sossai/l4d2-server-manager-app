import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
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
    private suspectedPlayerService: SuspectedPlayerService) {
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
    command.suspectedPlayer = suspectedPlayer;

    this.suspectedPlayerService.post(command).subscribe(() => this.refresh());
  }

  delete(steamId: string): void {
    this.modalService.confirm({
      nzTitle: 'Deseja realmente excluir?',
      nzOnOk: () => {
        this.suspectedPlayerService.delete(steamId).subscribe(_ => {
          this.messageService.create('success', 'Excluido com sucesso');
          this.refresh();
        });
      }
    });
  }
}
