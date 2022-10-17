import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Port } from 'src/app/port/port';
import { PortService } from 'src/app/port/services/port.service';
import { ServerService } from 'src/app/server/services/server.service';
import { UserService } from 'src/app/users/services/port.service';
import { User } from 'src/app/users/user';
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

  constructor(
    private router: Router,
    private modalService: NzModalService,
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
      nzTitle: 'Atenção, todos os servidores seram desligados, deseja continuar?',
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

      if (action == 'vanilla') {
        this.runVanilla(port.portNumber);
        return;
      }

      if (action == 'zone') {
        this.runZone(port.portNumber);
        return;
      }

      this.refresh();
      this.loading = false;
    });
  }

  runVanilla(port: number): void {
    this.serverService.runVanilla(port).subscribe(() => {
      this.router.navigate(['server', port]);
    });
  }

  runZone(port: number): void {
    this.serverService.runZone(port).subscribe(() => {
      this.router.navigate(['server', port]);
    });
  }

  hasPermissions(permission: string): boolean {
    if (!this.virtualMachine?.permissions)
      return false;

    return this.virtualMachine.permissions.indexOf(permission) !== -1;
  }

  canPowerOff(): boolean {
    return this.hasPermissions('power-off');
  }
}
