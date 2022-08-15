import { Component, OnInit } from '@angular/core';
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
  ports?: number[];

  constructor(
    private virtualMachineService: VirtualMachineService,
    private portService: PortService) {
  }

  ngOnInit(): void {
    this.virtualMachineService.get().subscribe(virtualMachine => this.virtualMachine = virtualMachine);
    this.portService.get().subscribe(ports => this.ports = ports);
  }
}
