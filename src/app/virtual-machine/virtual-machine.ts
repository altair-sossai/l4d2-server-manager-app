import { VirtualMachineStatus } from "./enums/virtual-machine-status.enum";

export interface VirtualMachine {
    status: VirtualMachineStatus;
    isOn: boolean;
    isOff: boolean;
    ipAddress: string;
}