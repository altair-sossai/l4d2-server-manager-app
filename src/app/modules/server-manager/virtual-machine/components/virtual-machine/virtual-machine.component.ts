import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/modules/auth/users/services/user.service';
import { User } from 'src/app/modules/auth/users/user';
import { Port } from '../../../port/port';
import { PortService } from '../../../port/services/port.service';
import { RunServerCommand } from '../../../server/commands/run-server.command';
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

  command: RunServerCommand = new RunServerCommand();
  refreshInterval: any;

  constructor(
    private router: Router,
    private modalService: NzModalService,
    private message: NzMessageService,
    private virtualMachineService: VirtualMachineService,
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
    if (this.loading)
      return;

    if (!silent) {
      this.virtualMachine = undefined;
      this.ports = undefined;
      this.user = undefined;
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

  powerOn(): void {
    this.loading = true;

    this.virtualMachineService.powerOn().subscribe({
      next: (result: any) => {
        this.loading = false;

        if (result?.port)
          this.goToServer(result?.port);
        else
          this.refresh();
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
