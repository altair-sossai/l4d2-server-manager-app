import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Port } from 'src/app/port/port';
import { PortService } from 'src/app/port/services/port.service';
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
  loading = false;

  constructor(
    private modalService: NzModalService,
    private virtualMachineService: VirtualMachineService,
    private portService: PortService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.virtualMachine = undefined;
    this.ports = undefined;

    this.virtualMachineService.get().subscribe(virtualMachine => {
      this.virtualMachine = virtualMachine;
      if (!this.virtualMachine.isOn)
        return;

      this.portService.get(this.virtualMachine.ipAddress).subscribe(ports => this.ports = ports);
    });
  }

  powerOn(): void {
    this.loading = true;
    this.virtualMachineService.powerOn().subscribe(virtualMachine => {
      this.virtualMachine = virtualMachine;
      this.loading = false;
    });
  }

  powerOff(): void {
    this.modalService.confirm({
      nzTitle: 'Atenção, todos os servidores seram desligados, deseja continuar?',
      nzOnOk: () => {
        this.loading = true;
        this.virtualMachineService.powerOff().subscribe(virtualMachine => {
          this.virtualMachine = virtualMachine;
          this.loading = false;
        });
      }
    });
  }
}
