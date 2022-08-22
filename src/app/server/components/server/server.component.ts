import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Player } from 'src/app/player/player';
import { PortStatus } from 'src/app/virtual-machine/enums/port-status.enum';
import { ServerInfo } from '../../info/server-info';
import { Server } from '../../server';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  port?: number;
  server?: Server;
  serverInfo?: ServerInfo;
  players?: Player[];
  loading = false;

  PortStatus = PortStatus;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private modalService: NzModalService,
    private message: NzMessageService,
    private serverService: ServerService) {
  }

  ngOnInit(): void {
    this.port = +this.route.snapshot.paramMap.get('port')!;
    this.refresh();
  }

  refresh(): void {
    if (!this.port)
      return;

    this.server = undefined;
    this.serverInfo = undefined;
    this.players = undefined;

    this.serverService.get(this.port).subscribe(server => {
      this.server = server;

      if (this.server.virtualMachine.isOff) {
        this.router.navigate(['/virtual-machine']);
        return;
      }

      if (!this.server.isRunning)
        return;

      this.serverService.info(this.server.ipAddress, this.port!).subscribe(serverInfo => this.serverInfo = serverInfo);
      this.serverService.players(this.server.ipAddress, this.port!).subscribe(players => this.players = players);
    });
  }

  run(): void {
    this.loading = true;
    this.serverService.run(this.port!).subscribe(() => {
      this.refresh();
      this.loading = false;
    });
  }

  stop(): void {
    this.modalService.confirm({
      nzTitle: 'Atenção, o servidor será desligado, deseja realmente continuar?',
      nzOnOk: () => {
        this.loading = true;
        this.serverService.stop(this.port!).subscribe(() => {
          this.refresh();
          this.loading = false;
        });
      }
    });
  }

  kickAllPlayers(): void {
    this.modalService.confirm({
      nzTitle: 'Atenção, todos os players serão kickados, deseja realmente continuar?',
      nzOnOk: () => {
        this.loading = true;
        this.serverService.kickAllPlayers(this.port!).subscribe(() => {
          this.refresh();
          this.loading = false;
        });
      }
    });
  }

  openPort(ranges: string | null): void {
    if (!ranges)
      ranges = prompt('Informe os IPs');

    if (!ranges)
      return;

    this.loading = true;
    this.serverService.openPort(this.port!, { ranges }).subscribe(() => {
      this.refresh();
      this.loading = false;
    });
  }

  closePort(): void {
    this.modalService.confirm({
      nzTitle: 'Atenção, a porta do servidor será fechada, deseja continuar?',
      nzOnOk: () => {
        this.loading = true;
        this.serverService.closePort(this.port!).subscribe(() => {
          this.refresh();
          this.loading = false;
        });
      }
    });
  }

  public get fullIpAddress(): string {
    return `${this.server?.ipAddress}:${this.server?.port}`;
  }

  public get connectCommand(): string {
    return `connect ${this.fullIpAddress}`;
  }

  public get dedicatedCommand(): string {
    return `mm_dedicated_force_servers ${this.fullIpAddress}`;
  }

  copied(): void {
    this.message.info('Copiado para a área de transferência');
  }
}
