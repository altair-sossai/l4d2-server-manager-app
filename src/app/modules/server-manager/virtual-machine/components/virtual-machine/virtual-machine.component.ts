import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/modules/auth/users/services/user.service';
import { User } from 'src/app/modules/auth/users/user';
import { Port } from '../../../port/port';
import { PortService } from '../../../port/services/port.service';
import { RunServerCommand } from '../../../server/commands/run-server.command';
import { Campaign } from '../../../server/enums/campaign.enum';
import { ServerService } from '../../../server/services/server.service';
import { VirtualMachineService } from '../../services/virtual-machine.service';
import { VirtualMachine } from '../../virtual-machine';

@Component({
  selector: 'app-virtual-machine',
  templateUrl: './virtual-machine.component.html',
  styleUrls: ['./virtual-machine.component.scss']
})
export class VirtualMachineComponent implements OnInit {

  virtualMachine?: VirtualMachine;
  ports?: Port[];
  user?: User;
  loading = false;
  action?: string;

  command: RunServerCommand = new RunServerCommand();

  Campaigns = Object.keys(Campaign).map(c => c as Campaign);

  constructor(
    private router: Router,
    private modalService: NzModalService,
    private message: NzMessageService,
    private virtualMachineService: VirtualMachineService,
    private serverService: ServerService,
    private portService: PortService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.virtualMachine = undefined;
    this.ports = undefined;
    this.user = undefined;
    this.action = undefined;

    this.virtualMachineService.get().subscribe(virtualMachine => {
      this.virtualMachine = virtualMachine;
      if (!this.virtualMachine.isOn)
        return;

      this.portService.get(this.virtualMachine.ipAddress).subscribe(ports => this.ports = ports);
      this.userService.find(this.virtualMachine.powerOnBy).subscribe(user => this.user = user);
    });
  }

  powerOn(action?: string): void {
    if (!action)
      return;

    this.loading = true;
    this.virtualMachineService.powerOn().subscribe(virtualMachine => {
      if (action == 'power-on') {
        this.refresh();
        this.loading = false;
        return;
      }

      this.runServer(virtualMachine, action);
    });
  }

  powerOff(): void {
    this.modalService.confirm({
      nzTitle: 'Atenção, todos os servidores serão desligados, deseja continuar?',
      nzOnOk: () => {
        this.loading = true;
        this.virtualMachineService.powerOff().subscribe(() => {
          this.refresh();
          this.loading = false;
        });
      }
    });
  }

  runServer(virtualMachine: VirtualMachine, action: string): void {
    this.portService.get(virtualMachine.ipAddress).subscribe(ports => {
      const port = ports.find(p => !p.isRunning);

      if (!port) {
        this.refresh();
        this.loading = false;
        return;
      }

      switch (action) {
        case 'vanilla': this.runVanilla(port.portNumber); return;
        case 'zone': this.runZone(port.portNumber); return;
      }

      this.refresh();
      this.loading = false;
    });
  }

  runVanilla(port: number): void {
    this.serverService.runVanilla(port, this.command).subscribe(() => {
      this.goToServer(port);
    });
  }

  runZone(port: number): void {
    this.serverService.runZone(port, this.command).subscribe(() => {
      this.goToServer(port);
    });
  }

  goToServer(port: number) {
    this.router.navigate(['server', port]);
  }

  hasPermissions(permission: string): boolean {
    if (!this.virtualMachine?.permissions)
      return false;

    return this.virtualMachine.permissions.indexOf(permission) !== -1;
  }

  canPowerOff(): boolean {
    return this.hasPermissions('power-off');
  }

  copied(): void {
    this.message.info('Copiado para a área de transferência');
  }
}
