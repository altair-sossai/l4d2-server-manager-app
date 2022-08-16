import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/player/player';
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

  constructor(private route: ActivatedRoute,
    private router: Router,
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
}
