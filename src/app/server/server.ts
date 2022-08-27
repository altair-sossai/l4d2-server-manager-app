import { PortInfo } from "../virtual-machine/value-objects/port-info";
import { VirtualMachine } from "../virtual-machine/virtual-machine";

export interface Server {
    virtualMachine: VirtualMachine;
    ipAddress: string;
    port: number;
    isRunning: boolean;
    portInfo: PortInfo;
    permissions: string[];
    startedBy: string;
    startedAt: Date;
}