import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class VirtualMachineComponent implements OnInit, OnDestroy {

  virtualMachine?: VirtualMachine;
  ports?: Port[];
  user?: User;
  loading = false;
  action?: string;

  command: RunServerCommand = new RunServerCommand();
  refreshInterval: any;

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
    this.refreshInterval = setInterval(() => this.refresh(true), 30 * 1000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval)
      clearInterval(this.refreshInterval);
  }

  refresh(silent = false): void {
    if (!silent) {
      this.virtualMachine = undefined;
      this.ports = undefined;
      this.user = undefined;
      this.action = undefined;
    }

    this.virtualMachineService.get().subscribe(virtualMachine => {
      this.virtualMachine = virtualMachine;
      if (!this.virtualMachine.isOn && this.virtualMachine.powerOffBy) {
        this.userService.find(this.virtualMachine.powerOffBy).subscribe(user => this.user = user);
        return;
      }

      this.portService.get(this.virtualMachine.ipAddress).subscribe(ports => this.ports = ports);

      if (this.virtualMachine.powerOnBy)
        this.userService.find(this.virtualMachine.powerOnBy).subscribe(user => this.user = user);
    });
  }

  restart(): void {
    this.modalService.confirm({
      nzTitle: 'Atenção, todos os servidores serão reiniciados, deseja continuar?',
      nzOnOk: () => {
        this.loading = true;
        this.virtualMachineService.restart().subscribe({
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
    })
  };

  powerOn(action?: string): void {
    if (!action)
      return;

    this.loading = true;
    this.virtualMachineService.powerOn().subscribe({
      next: virtualMachine => {
        if (action == 'power-on') {
          this.refresh();
          this.loading = false;
          return;
        }

        this.runServer(virtualMachine);
      },
      error: () => {
        this.refresh();
        this.loading = false;
      }
    });
  }

  powerOff(): void {
    this.modalService.confirm({
      nzTitle: 'Atenção, todos os servidores serão desligados, deseja continuar?',
      nzOnOk: () => {
        this.loading = true;
        this.virtualMachineService.powerOff().subscribe({
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
    });
  }

  runServer(virtualMachine: VirtualMachine): void {
    this.portService.get(virtualMachine.ipAddress).subscribe({
      next: ports => {
        const port = ports.find(p => !p.isRunning);

        if (!port) {
          this.refresh();
          this.loading = false;
          return;
        }

        this.serverService.run(port.portNumber, this.command).subscribe(() => {
          this.goToServer(port.portNumber);
        });
      },
      error: () => {
        this.refresh();
        this.loading = false;
      }
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

  canRestart(): boolean {
    return this.canPowerOff();
  }

  canPowerOff(): boolean {
    return this.hasPermissions('power-off');
  }

  copied(): void {
    this.message.info('Copiado para a área de transferência');
  }
}
