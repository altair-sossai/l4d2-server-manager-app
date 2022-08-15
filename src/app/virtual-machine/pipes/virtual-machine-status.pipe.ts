import { Pipe, PipeTransform } from '@angular/core';
import { VirtualMachineStatus } from '../enums/virtual-machine-status.enum';

@Pipe({
  name: 'virtual-machine-status'
})
export class VirtualMachineStatusPipe implements PipeTransform {
  static descriptions = {
    [VirtualMachineStatus.On]: 'Ligado',
    [VirtualMachineStatus.Off]: 'Desligado',
    [VirtualMachineStatus.Unknown]: 'Desconhecido',
  }

  transform(status: VirtualMachineStatus): string {
    return VirtualMachineStatusPipe.descriptions[status];
  }
}
