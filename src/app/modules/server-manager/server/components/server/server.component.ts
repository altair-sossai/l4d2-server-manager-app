import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/modules/auth/users/services/user.service';
import { User } from 'src/app/modules/auth/users/user';
import { Player } from 'src/app/modules/server-manager/player/player';
import { PortStatus } from '../../../virtual-machine/enums/port-status.enum';
import { RunServerCommand } from '../../commands/run-server.command';
import { Campaign } from '../../enums/campaign.enum';
import { ServerInfo } from '../../info/server-info';
import { Server } from '../../server';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit, OnDestroy {

  port?: number;
  server?: Server;
  serverInfo?: ServerInfo;
  players?: Player[];
  user?: User;
  loading = false;

  command: RunServerCommand = new RunServerCommand();
  refreshInterval: any;

  PortStatus = PortStatus;
  Campaigns = Object.keys(Campaign).map(c => c as Campaign);

  constructor(private route: ActivatedRoute,
    private router: Router,
    private modalService: NzModalService,
    private message: NzMessageService,
    private serverService: ServerService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.port = +this.route.snapshot.paramMap.get('port')!;
    this.refresh();
    this.refreshInterval = setInterval(() => this.refresh(true), 30 * 1000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval)
      clearInterval(this.refreshInterval);
  }

  refresh(silent = false): void {
    if (!this.port)
      return;

    if (!silent) {
      this.server = undefined;
      this.serverInfo = undefined;
      this.players = undefined;
      this.user = undefined;
    }

    this.serverService.get(this.port).subscribe(server => {
      this.server = server;

      if (!this.server.ipAddress) {
        this.router.navigate(['/virtual-machine']);
        return;
      }

      if (!this.server.isRunning)
        return;

      this.serverService.info(this.server.ipAddress, this.port!).subscribe(serverInfo => this.serverInfo = serverInfo);
      this.serverService.players(this.server.ipAddress, this.port!).subscribe(players => this.players = players);

      if (this.server.startedBy)
        this.userService.find(this.server.startedBy).subscribe(user => this.user = user);
    });
  }

  runServer() {
    this.loading = true;

    this.serverService.run(this.port!, this.command).subscribe({
      next: () => {
        this.refresh();
        this.loading = false;
      },
      error: () => {
        this.refresh();
        this.loading = false;
      }
    });
  }

  stop(): void {
    this.modalService.confirm({
      nzTitle: 'Atenção, o servidor será desligado, deseja realmente continuar?',
      nzOnOk: () => {
        this.loading = true;
        this.serverService.stop(this.port!).subscribe({
          next: () => {
            this.router.navigate(['/virtual-machine']);
          },
          error: () => {
            this.refresh();
            this.loading = false;
          }
        });
      }
    });
  }

  openPort(): void {
    this.loading = true;
    this.serverService.openPort(this.port!).subscribe({
      next: () => {
        this.refresh();
        this.loading = false;
      },
      error: () => {
        this.refresh();
        this.loading = false;
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

  hasPermissions(permission: string): boolean {
    if (!this.server?.permissions)
      return false;

    return this.server.permissions.indexOf(permission) !== -1;
  }

  canStop(): boolean {
    return this.hasPermissions('stop');
  }

  canOpenPort(): boolean {
    return this.hasPermissions('open-port');
  }
}
